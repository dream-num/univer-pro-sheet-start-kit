import './style.css';
import type { MenuConfig } from '@univerjs/preset-sheets-core';
import { UniverSheetsExchangeClientPlugin } from '@univerjs/preset-sheets-advanced';
import {
    DependentOn,
    IConfigService,
    Inject,
    Injector,
    LocaleService,
    LocaleType,
    Plugin,
    registerDependencies,
    UniverInstanceType,
} from '@univerjs/presets';
import { ComponentsController } from './controllers/components.controller';
import { ExchangeClientController } from './controllers/exchange.controller';
import { SheetsExchangeClientController } from './controllers/sheets-exchange.controller';
import arSA from './locale/ar-SA';
import caES from './locale/ca-ES';
import deDE from './locale/de-DE';
import enUS from './locale/en-US';
import esES from './locale/es-ES';
import faIR from './locale/fa-IR';
import frFR from './locale/fr-FR';
import idID from './locale/id-ID';
import itIT from './locale/it-IT';
import jaJP from './locale/ja-JP';
import koKR from './locale/ko-KR';
import plPL from './locale/pl-PL';
import ptBR from './locale/pt-BR';
import ruRU from './locale/ru-RU';
import skSK from './locale/sk-SK';
import viVN from './locale/vi-VN';
import zhCN from './locale/zh-CN';
import zhHK from './locale/zh-HK';
import zhTW from './locale/zh-TW';
import { ExchangeOperateService, IExchangeOperateService } from './services/operate.service';
import { IUploadNotificationService, UploadNotificationService } from './services/upload-notification.service';

export interface ICustomImportExportConfig {
    menu?: MenuConfig;
}

@DependentOn(UniverSheetsExchangeClientPlugin)
export class CustomImportExportPlugin extends Plugin {
    static override pluginName = 'CUSTOM_IMPORT_EXPORT_PLUGIN';
    static override type = UniverInstanceType.UNIVER_SHEET;

    constructor(
        _config: ICustomImportExportConfig = {},
        @Inject(Injector) protected override readonly _injector: Injector,
        @Inject(LocaleService) private readonly _localeService: LocaleService,
        @IConfigService private readonly _configService: IConfigService
    ) {
        super();
        this._localeService.load({
            [LocaleType.AR_SA]: arSA,
            [LocaleType.CA_ES]: caES,
            [LocaleType.DE_DE]: deDE,
            [LocaleType.EN_US]: enUS,
            [LocaleType.ES_ES]: esES,
            [LocaleType.FA_IR]: faIR,
            [LocaleType.FR_FR]: frFR,
            [LocaleType.ID_ID]: idID,
            [LocaleType.IT_IT]: itIT,
            [LocaleType.JA_JP]: jaJP,
            [LocaleType.KO_KR]: koKR,
            [LocaleType.PL_PL]: plPL,
            [LocaleType.PT_BR]: ptBR,
            [LocaleType.RU_RU]: ruRU,
            [LocaleType.SK_SK]: skSK,
            [LocaleType.VI_VN]: viVN,
            [LocaleType.ZH_CN]: zhCN,
            [LocaleType.ZH_HK]: zhHK,
            [LocaleType.ZH_TW]: zhTW,
        });
        if (_config.menu) {
            this._configService.setConfig('menu', _config.menu, { merge: true });
        }
    }

    override onStarting(): void {
        registerDependencies(this._injector, [
            [IExchangeOperateService, { useClass: ExchangeOperateService }],
            [IUploadNotificationService, { useClass: UploadNotificationService }],
            [ComponentsController],
            [ExchangeClientController],
            [SheetsExchangeClientController],
        ]);
    }

    override onReady(): void {
        this.disposeWithMe(this._injector.get(IUploadNotificationService));
        this.disposeWithMe(this._injector.get(IExchangeOperateService));
        this.disposeWithMe(this._injector.get(ComponentsController));
        this.disposeWithMe(this._injector.get(ExchangeClientController));
        this.disposeWithMe(this._injector.get(SheetsExchangeClientController));
    }
}
