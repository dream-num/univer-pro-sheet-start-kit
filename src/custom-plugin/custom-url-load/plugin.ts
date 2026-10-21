import { UniverCollaborationClientPlugin } from '@univerjs/preset-sheets-collaboration';
import { DependentOn, Inject, Injector, Plugin } from '@univerjs/presets';
import { CollaborationDataLoaderController } from '../custom-url-load/controllers/data-loader.controller';
import { IURLService } from '../custom-url-load/services/url.service';
import { WebURLService } from '../custom-url-load/services/web-url.service';

@DependentOn(UniverCollaborationClientPlugin)
export class CustomUrlLoadPlugin extends Plugin {
    static override pluginName = 'CUSTOM_URL_LOAD_PLUGIN';

    constructor(
        _config: undefined,
        @Inject(Injector) protected override readonly _injector: Injector
    ) {
        super();
    }

    override onStarting(): void {
        this._injector.add([IURLService, { useClass: WebURLService }]);
        this._injector.add([CollaborationDataLoaderController]);

        this.disposeWithMe(this._injector.get(IURLService));
        this.disposeWithMe(this._injector.get(CollaborationDataLoaderController));
    }
}
