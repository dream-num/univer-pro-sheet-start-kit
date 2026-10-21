import type { LocaleKey } from '../../locale/types';
import { LocaleService } from '@univerjs/presets';
import { useDependency } from '@univerjs/preset-sheets-core';
import { UploadCancel } from './upload-cancel/UploadCancel';
import { UploadProgress } from './upload-progress/UploadProgress';

export function Uploading() {
    const localeService = useDependency(LocaleService);

    return (
        <div className="univer-mt-5 univer-flex univer-flex-col">
            <span
                className={`
                  univer-pl-2 univer-pr-4 univer-text-sm univer-text-gray-900
                  dark:!univer-text-gray-0
                `}
            >
                {localeService.t<LocaleKey>('custom-import-export.wait')}
            </span>
            <div className="univer-pl-2 univer-pr-4">
                <UploadProgress />
            </div>
            <UploadCancel />
        </div>
    );
}
