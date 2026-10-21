import type { LocaleKey } from '../../locale/types';
import { LocaleService } from '@univerjs/presets';
import { useDependency } from '@univerjs/preset-sheets-core';
import { UploadAgain } from '../upload-again/UploadAgain';

export function UploadError() {
    const localeService = useDependency(LocaleService);
    return (
        <div className="univer-mt-5 univer-flex univer-flex-col">
            <span
                className={`
                  univer-mb-3 univer-py-0 univer-pl-2 univer-pr-4 univer-text-sm univer-text-gray-900
                  dark:!univer-text-gray-0
                `}
            >
                {localeService.t<LocaleKey>('custom-import-export.interrupt')}
            </span>
            <UploadAgain />
        </div>
    );
};
