import type { LocaleKey } from '../../locale/types';
import { LocaleService, UniverInstanceType } from '@univerjs/presets';
import { Button } from '@univerjs/preset-sheets-core';
import {
    ClockIcon,
    CloseIcon,
    DocsMultiIcon,
    ErrorIcon,
    ShareRangeIcon,
    SheetsMultiIcon,
    SlidesMultiIcon,
    SuccessIcon,
} from '@univerjs/icons';
import { useDependency, useObservable } from '@univerjs/preset-sheets-core';
import { IExchangeOperateService } from '../../services/operate.service';
import { IUploadNotificationService, UploadNotificationState } from '../../services/upload-notification.service';

const iconMap = {
    [UploadNotificationState.SUCCESS]: <SuccessIcon className="univer-text-green-500" />,
    [UploadNotificationState.UPLOADING]: <ClockIcon className="univer-text-blue-500" />,
    [UploadNotificationState.ERROR]: <ErrorIcon className="univer-text-red-500" />,
};

export function MobileUploadNotification() {
    const uploadNotificationService = useDependency(IUploadNotificationService);
    const localeService = useDependency(LocaleService);
    const exchangeOperateService = useDependency(IExchangeOperateService);
    const visible = useObservable(uploadNotificationService.visible$, false);
    const uploadState = useObservable(uploadNotificationService.state$, UploadNotificationState.UPLOADING);
    const linkList = useObservable(uploadNotificationService.list$, []);
    const progress = useObservable(exchangeOperateService.progress$, { done: 0, count: 0 });

    if (!visible) {
        return null;
    }

    function renderIcon(type: UniverInstanceType) {
        switch (type) {
            case UniverInstanceType.UNIVER_DOC:
                return <DocsMultiIcon />;
            case UniverInstanceType.UNIVER_SHEET:
            case UniverInstanceType.UNIVER_BASE:
                return <SheetsMultiIcon />;
            case UniverInstanceType.UNIVER_SLIDE:
                return <SlidesMultiIcon />;
            default:
                return null;
        }
    }

    function renderTitle() {
        switch (uploadState) {
            case UploadNotificationState.SUCCESS:
                return localeService.t<LocaleKey>('custom-import-export.uploadSuccess');
            case UploadNotificationState.ERROR:
                return localeService.t<LocaleKey>('custom-import-export.unknownMistake');
            default:
                return localeService.t<LocaleKey>('custom-import-export.uploading');
        }
    }

    const progressPercent = progress.count > 0 ? Math.floor(progress.done / progress.count * 100) : 0;

    return (
        <section
            data-u-comp="mobile-upload-notification"
            className="
              univer-fixed univer-bottom-16 univer-left-3 univer-right-3 univer-z-[1000] univer-box-border univer-grid
              univer-max-h-[50vh] univer-gap-3 univer-overflow-y-auto univer-rounded-xl univer-bg-gray-0 univer-p-4
              univer-shadow-lg
              dark:!univer-bg-gray-900
            "
        >
            <header className="univer-flex univer-items-center univer-justify-between univer-gap-3">
                <span className="univer-flex univer-min-w-0 univer-items-center univer-gap-2 univer-font-semibold">
                    <span
                        className="
                          univer-flex univer-size-6 univer-shrink-0 univer-items-center univer-justify-center
                          univer-text-xl
                        "
                    >
                        {iconMap[uploadState]}
                    </span>
                    <span className="univer-truncate">{renderTitle()}</span>
                </span>
                <Button
                    size="icon"
                    variant="text"
                    aria-label={localeService.t<LocaleKey>('custom-import-export.cancel')}
                    onClick={() => uploadNotificationService.hide()}
                >
                    <CloseIcon />
                </Button>
            </header>

            {uploadState === UploadNotificationState.UPLOADING && (
                <div className="univer-grid univer-gap-3">
                    <span
                        className="
                          univer-text-sm univer-text-gray-700
                          dark:!univer-text-gray-200
                        "
                    >
                        {localeService.t<LocaleKey>('custom-import-export.wait')}
                    </span>
                    <div
                        className="
                          univer-h-1.5 univer-w-full univer-overflow-hidden univer-rounded-lg univer-bg-gray-200
                        "
                    >
                        <div
                            className="
                              univer-h-full univer-rounded-lg univer-bg-primary-600 univer-transition-[width]
                              univer-duration-500
                            "
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <Button variant="text" onClick={() => exchangeOperateService.interrupt()}>
                        {localeService.t<LocaleKey>('custom-import-export.cancel')}
                    </Button>
                </div>
            )}

            {uploadState === UploadNotificationState.ERROR && (
                <div className="univer-grid univer-gap-2">
                    <span
                        className="
                          univer-text-sm univer-text-gray-700
                          dark:!univer-text-gray-200
                        "
                    >
                        {localeService.t<LocaleKey>('custom-import-export.interrupt')}
                    </span>
                    <Button variant="text" onClick={() => exchangeOperateService.retryImportSheetToUnitId()}>
                        {localeService.t<LocaleKey>('custom-import-export.uploadAgain')}
                    </Button>
                </div>
            )}

            {linkList.length > 0 && (
                <ul className="univer-m-0 univer-grid univer-list-none univer-gap-2 univer-p-0">
                    {linkList.map((item) => (
                        <li key={item.link}>
                            <a
                                className="
                                  univer-flex univer-items-center univer-gap-2 univer-rounded-lg univer-bg-gray-50
                                  univer-px-3 univer-py-2 univer-text-gray-900 univer-no-underline
                                  dark:!univer-bg-gray-800 dark:!univer-text-gray-0
                                "
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="univer-flex univer-size-5 univer-shrink-0 univer-items-center">
                                    {renderIcon(item.type)}
                                </span>
                                <span className="univer-min-w-0 univer-flex-1 univer-truncate univer-text-sm">{item.name}</span>
                                <ShareRangeIcon className="univer-shrink-0" />
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            {uploadState === UploadNotificationState.SUCCESS && (
                <div className="univer-flex univer-items-center univer-justify-between univer-gap-3">
                    <span className="univer-text-sm univer-text-gray-500">
                        {localeService.t<LocaleKey>('custom-import-export.uploadSuccessTip', `${linkList.length}`)}
                    </span>
                    <Button variant="text" onClick={() => exchangeOperateService.retryImportSheetToUnitId()}>
                        {localeService.t<LocaleKey>('custom-import-export.uploadAgain')}
                    </Button>
                </div>
            )}
        </section>
    );
}
