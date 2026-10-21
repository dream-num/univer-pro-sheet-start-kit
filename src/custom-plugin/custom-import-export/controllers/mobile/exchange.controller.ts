import { Disposable, Inject, Injector } from '@univerjs/presets';
import { BuiltInUIPart, connectInjector, IUIPartsService } from '@univerjs/preset-sheets-core';
import { MobileUploadNotification } from '../../views/mobile/MobileUploadNotification';

export class MobileExchangeClientController extends Disposable {
    constructor(
        @Inject(Injector) private readonly _injector: Injector,
        @IUIPartsService private readonly _uiPartsService: IUIPartsService
    ) {
        super();

        this.disposeWithMe(
            this._uiPartsService.registerComponent(
                BuiltInUIPart.CONTENT,
                () => connectInjector(MobileUploadNotification, this._injector)
            )
        );
    }
}
