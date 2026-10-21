import type { ISetWorksheetActivateCommandParams } from '@univerjs/preset-sheets-core';
import type { Subscription } from 'rxjs';
import { DataLoaderService } from '@univerjs/preset-sheets-collaboration';
import {
    ICommandService,
    ILogService,
    Inject,
    IUniverInstanceService,
    RxDisposable,
    toDisposable,
    UniverInstanceType,
    Workbook,
} from '@univerjs/presets';
import { SetWorksheetActivateCommand } from '@univerjs/preset-sheets-core';
import { takeUntil } from 'rxjs';
import { IURLService } from '../services/url.service';

/**
 * Restores the former built-in URL loading behavior in the host application.
 * `unit` identifies the document, `type` selects its type, and `subunit` selects
 * the initial worksheet, for example: `?unit=workbook-id&type=2&subunit=sheet-id`.
 * Browser back/forward synchronizes worksheets within the loaded document.
 */
export class CollaborationDataLoaderController extends RxDisposable {
    private _unitId: string | undefined;
    private _unitType = UniverInstanceType.UNIVER_SHEET;
    private _workbook: Workbook | null = null;
    private _activeSheetSubscription: Subscription | null = null;

    constructor(
        @IURLService private readonly _urlService: IURLService,
        @ILogService private readonly _logService: ILogService,
        @ICommandService private readonly _commandService: ICommandService,
        @Inject(DataLoaderService) private readonly _dataLoaderService: DataLoaderService,
        @IUniverInstanceService private readonly _instanceService: IUniverInstanceService
    ) {
        super();
        this._init();
    }

    private _init(): void {
        this._unitId = this._urlService.getParam('unit');
        const type = this._urlService.getParam('type');
        if (!this._unitId || !type) {
            return;
        }

        this._unitType = Number(type);
        this.disposeWithMe(toDisposable(() => this._unbindWorkbook()));

        // A history rollback can replace the Workbook while retaining the same document ID.
        this._dataLoaderService.unitLoaded$.pipe(takeUntil(this.dispose$)).subscribe((unit) => {
            if (unit instanceof Workbook && unit.getUnitId() === this._unitId) {
                this._bindWorkbook(unit).catch((error: unknown) => this._reportError(error));
            }
        });
        this._instanceService.unitDisposed$.pipe(takeUntil(this.dispose$)).subscribe((unit) => {
            if (unit === this._workbook) {
                this._unbindWorkbook();
            }
        });
        this._urlService.urlChange$.pipe(takeUntil(this.dispose$)).subscribe(() => {
            if (this._workbook) {
                this._activateWorksheetFromUrl(this._workbook).catch((error: unknown) => this._reportError(error));
            }
        });

        this._dataLoaderService.loadUnit(this._unitId, this._unitType, this._urlService.getParam('subunit'))
            .catch((error: unknown) => this._reportError(error));
    }

    private async _bindWorkbook(workbook: Workbook): Promise<void> {
        this._unbindWorkbook();
        this._workbook = workbook;
        // Snapshot replay updates the model directly; activate once so the renderer observes it.
        await this._activateWorksheetFromUrl(workbook, true);
        if (this._workbook !== workbook || this._disposed) {
            return;
        }

        this._activeSheetSubscription = workbook.activeSheet$.subscribe((worksheet) => {
            if (worksheet) {
                this._updateUrl(worksheet.getSheetId());
            }
        });
    }

    private _unbindWorkbook(): void {
        this._activeSheetSubscription?.unsubscribe();
        this._activeSheetSubscription = null;
        this._workbook = null;
    }

    private _matchesDocument(): boolean {
        return this._urlService.getParam('unit') === this._unitId
            && Number(this._urlService.getParam('type')) === this._unitType;
    }

    private async _activateWorksheetFromUrl(workbook: Workbook, forceActivate = false): Promise<void> {
        if (this._disposed || this._workbook !== workbook || !this._matchesDocument()) {
            return;
        }

        const requestedSheetId = this._urlService.getParam('subunit');
        const worksheet = (requestedSheetId ? workbook.getSheetBySheetId(requestedSheetId) : null)
            ?? workbook.getSheetBySheetId(workbook.getUnhiddenWorksheets()[0]);
        if (!worksheet) {
            return;
        }

        const subUnitId = worksheet.getSheetId();
        if (subUnitId !== requestedSheetId) {
            this._updateUrl(subUnitId, true);
        }
        if (!forceActivate && workbook.getActiveSheet()?.getSheetId() === subUnitId) {
            return;
        }

        await this._commandService.executeCommand<ISetWorksheetActivateCommandParams>(SetWorksheetActivateCommand.id, {
            unitId: workbook.getUnitId(),
            subUnitId,
        });
    }

    private _updateUrl(subUnitId: string, replace = false): void {
        if (this._matchesDocument() && this._urlService.getParam('subunit') !== subUnitId) {
            this._urlService.setParam('subunit', subUnitId, replace);
        }
    }

    private _reportError(error: unknown): void {
        this._logService.error('[CollaborationDataLoaderController]', error);
    }
}
