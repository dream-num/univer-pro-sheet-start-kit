import type { LocaleKey } from '../../../locale/types';
import { LocaleService } from '@univerjs/presets';
import { useDependency } from '@univerjs/preset-sheets-core';
import { IExchangeOperateService } from '../../../services/operate.service';
import { UploadButton } from '../../upload-button/UploadButton';

export function UploadCancel() {
    const exchangeOperateService = useDependency(IExchangeOperateService);
    const localeService = useDependency(LocaleService);

    function onClick() {
        exchangeOperateService.interrupt();
    }

    return (
        <UploadButton onClick={onClick}>{localeService.t<LocaleKey>('custom-import-export.cancel')}</UploadButton>
    );
};
