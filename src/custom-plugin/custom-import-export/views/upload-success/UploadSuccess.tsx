import type { LocaleKey } from '../../locale/types';
import { LocaleService } from '@univerjs/presets';
import { useDependency } from '@univerjs/preset-sheets-core';
import { UploadAgain } from '../upload-again/UploadAgain';

export interface IUploadSuccessProps {
    count: number;
}

export function UploadSuccess(props: IUploadSuccessProps) {
    const { count } = props;
    const localeService = useDependency(LocaleService);

    return (
        <div
            className={`
              univer-mt-3 univer-flex univer-items-center univer-justify-between univer-py-0 univer-pl-2 univer-pr-1
            `}
        >
            <span className="univer-text-sm univer-text-gray-500">
                {localeService.t<LocaleKey>('custom-import-export.uploadSuccessTip', `${count}`)}
            </span>
            <UploadAgain />
        </div>
    );
};
