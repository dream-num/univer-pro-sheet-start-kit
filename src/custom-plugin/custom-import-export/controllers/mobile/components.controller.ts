import { Disposable, Inject } from '@univerjs/presets';
import { DirectExportIcon, ExportIcon, FolderIcon } from '@univerjs/icons';
import { ComponentManager, IconManager } from '@univerjs/preset-sheets-core';
import { EXPORT_FORMAT_DIALOG } from '../../views/export-format-dialog/ExportFormatDialog';
import { MobileExportFormatDialog } from '../../views/mobile/MobileExportFormatDialog';

export class MobileComponentsController extends Disposable {
    constructor(
        @Inject(IconManager) private readonly _iconManager: IconManager,
        @Inject(ComponentManager) private readonly _componentManager: ComponentManager
    ) {
        super();

        this.disposeWithMe(this._iconManager.register({ DirectExportIcon, ExportIcon, FolderIcon }));
        this.disposeWithMe(this._componentManager.register(EXPORT_FORMAT_DIALOG, MobileExportFormatDialog));
    }
}
