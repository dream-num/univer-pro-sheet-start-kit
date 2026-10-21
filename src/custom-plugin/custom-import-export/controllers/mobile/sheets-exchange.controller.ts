import { Disposable, ICommandService } from '@univerjs/presets';
import { IMenuManagerService } from '@univerjs/preset-sheets-core';
import { ExportSheetByFormatOperation, ImportSheetOperation } from '../../commands/operations/exchange.operation';
import { MobileExportSheetOperation } from '../../commands/operations/mobile/exchange.operation';
import { mobileMenuSchema } from '../../menu/mobile-schema';

export class SheetsExchangeClientMobileController extends Disposable {
    constructor(
        @ICommandService private readonly _commandService: ICommandService,
        @IMenuManagerService private readonly _menuManagerService: IMenuManagerService
    ) {
        super();

        [
            ImportSheetOperation,
            MobileExportSheetOperation,
            ExportSheetByFormatOperation,
        ].forEach((command) => this.disposeWithMe(this._commandService.registerCommand(command)));
        this._menuManagerService.mergeMenu(mobileMenuSchema);
    }
}
