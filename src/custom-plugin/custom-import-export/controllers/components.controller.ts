import { Disposable, Inject } from '@univerjs/presets';
import { DirectExportIcon, ExportIcon, FolderIcon } from '@univerjs/icons';
import { ComponentManager, IconManager } from '@univerjs/preset-sheets-core';
import { EXPORT_FORMAT_DIALOG, ExportFormatDialog } from '../views/export-format-dialog/ExportFormatDialog';

export class ComponentsController extends Disposable {
    constructor(
        @Inject(IconManager) private readonly _iconManager: IconManager,
        @Inject(ComponentManager) private readonly _componentManager: ComponentManager
    ) {
        super();

        this._registerIcons();
        this._registerComponents();
    }

    private _registerIcons() {
        this.disposeWithMe(this._iconManager.register({ DirectExportIcon, ExportIcon, FolderIcon }));
    }

    private _registerComponents() {
        this.disposeWithMe(this._componentManager.register(EXPORT_FORMAT_DIALOG, ExportFormatDialog));
    }
}
