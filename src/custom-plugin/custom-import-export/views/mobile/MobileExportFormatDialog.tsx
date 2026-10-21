import type { LocaleKey } from '../../locale/types';
import { LocaleService } from '@univerjs/presets';
import { Button, MobileActionRowGroup, MobileSelect, Radio } from '@univerjs/preset-sheets-core';
import { LoadingMultiIcon } from '@univerjs/icons';
import { useDependency } from '@univerjs/preset-sheets-core';
import { useRef, useState } from 'react';
import { ExchangeFormat } from '@univerjs/preset-sheets-advanced';

interface IMobileExchangeTargetItem {
    label: string;
    value: string;
}

interface IMobileExportFormatDialogProps {
    formats: ExchangeFormat[];
    items: IMobileExchangeTargetItem[];
    selectedId: string;
    onCancel: () => void;
    onConfirm: (format: ExchangeFormat, selectedId: string) => void | Promise<void>;
}

export function MobileExportFormatDialog({
    formats,
    items,
    selectedId: initialSelectedId,
    onCancel,
    onConfirm,
}: IMobileExportFormatDialogProps) {
    const localeService = useDependency(LocaleService);
    const [format, setFormat] = useState(formats[0]);
    const [selectedId, setSelectedId] = useState(initialSelectedId);
    const [isExporting, setIsExporting] = useState(false);
    const isExportingRef = useRef(false);

    async function handleConfirm() {
        if (isExportingRef.current) {
            return;
        }

        isExportingRef.current = true;
        setIsExporting(true);
        try {
            await onConfirm(format, selectedId);
        } finally {
            isExportingRef.current = false;
            setIsExporting(false);
        }
    }

    return (
        <div className="univer-grid univer-gap-4">
            <div className="univer-grid univer-gap-3">
                {formats.map((item) => (
                    <div
                        key={item}
                        className="
                          univer-grid univer-gap-2 univer-rounded-xl univer-bg-gray-50 univer-p-3
                          dark:!univer-bg-gray-800
                        "
                    >
                        <Radio
                            value={item}
                            checked={format === item}
                            onChange={(value) => setFormat(value as ExchangeFormat)}
                        >
                            {item.toUpperCase()}
                        </Radio>
                        {item !== ExchangeFormat.XLSX && format === item && (
                            <MobileSelect
                                className="univer-w-full !univer-min-w-0"
                                value={selectedId}
                                options={items}
                                onChange={(value) => setSelectedId(String(value))}
                            />
                        )}
                    </div>
                ))}
            </div>
            <MobileActionRowGroup
                className="
                  univer-sticky univer-bottom-0 univer-bg-gray-0 univer-py-3
                  dark:!univer-bg-gray-900
                "
            >
                <Button type="button" onClick={onCancel}>
                    {localeService.t<LocaleKey>('custom-import-export.cancel')}
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    aria-busy={isExporting}
                    disabled={isExporting || !format || (format !== ExchangeFormat.XLSX && !selectedId)}
                    onClick={handleConfirm}
                >
                    {isExporting && <LoadingMultiIcon className="univer-animate-spin" />}
                    {localeService.t<LocaleKey>('custom-import-export.confirm')}
                </Button>
            </MobileActionRowGroup>
        </div>
    );
}
