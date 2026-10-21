import { Disposable, ICommandService } from '@univerjs/presets';
import { IMenuManagerService } from '@univerjs/preset-sheets-core';
import {
    ExportSheetByFormatOperation,
    ExportSheetOperation,
    ImportSheetOperation,
} from '../commands/operations/exchange.operation';
import { menuSchema } from '../menu/schema';

export class SheetsExchangeClientController extends Disposable {
    constructor(
        @ICommandService private readonly _commandService: ICommandService,
        @IMenuManagerService protected readonly _menuManagerService: IMenuManagerService
    ) {
        super();

        this._initCommands();
        this._initMenus();
    }

    private _initCommands(): void {
        [
            ImportSheetOperation,
            ExportSheetOperation,
            ExportSheetByFormatOperation,
        ].forEach((c) => {
            this.disposeWithMe(this._commandService.registerCommand(c));
        });
    }

    private _initMenus(): void {
        this._menuManagerService.mergeMenu(menuSchema);
    }
}
