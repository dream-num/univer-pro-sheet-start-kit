import type { IAccessor, ICommand, IDisposable, Workbook } from '@univerjs/presets';
import type { LocaleKey } from '../../../locale/types';
import { ExchangeFormat } from '@univerjs/preset-sheets-advanced';
import {
    CommandType,
    ICommandService,
    IUniverInstanceService,
    LocaleService,
    UniverInstanceType,
} from '@univerjs/presets';
import { IDialogService } from '@univerjs/preset-sheets-core';
import { EXPORT_FORMAT_DIALOG } from '../../../views/export-format-dialog/ExportFormatDialog';
import {
    createSheetExportDialogData,
    EXPORT_SHEET_OPERATION_ID,
    ExportSheetByFormatOperation,
    SHEET_EXPORT_FORMAT_DIALOG_ID,
} from '../exchange.operation';

export const MobileExportSheetOperation: ICommand = {
    id: EXPORT_SHEET_OPERATION_ID,
    type: CommandType.OPERATION,
    handler: (accessor: IAccessor) => {
        const workbook = accessor.get(IUniverInstanceService)
            .getCurrentUnitOfType<Workbook>(UniverInstanceType.UNIVER_SHEET);
        if (!workbook) {
            return false;
        }

        const dialogData = createSheetExportDialogData(workbook);
        const dialogService = accessor.get(IDialogService);
        const commandService = accessor.get(ICommandService);
        const localeService = accessor.get(LocaleService);
        let dialogDisposable: IDisposable | null = null;
        const closeDialog = () => {
            dialogDisposable?.dispose();
            dialogDisposable = null;
        };

        dialogDisposable = dialogService.open({
            id: SHEET_EXPORT_FORMAT_DIALOG_ID,
            title: { title: localeService.t<LocaleKey>('custom-import-export.download') },
            mask: true,
            maskClosable: false,
            children: {
                label: {
                    name: EXPORT_FORMAT_DIALOG,
                    props: {
                        formats: [ExchangeFormat.XLSX, ExchangeFormat.CSV, ExchangeFormat.TSV],
                        ...dialogData,
                        onCancel: closeDialog,
                        onConfirm: async (format: ExchangeFormat, sheetId: string) => {
                            await commandService.executeCommand(ExportSheetByFormatOperation.id, { format, sheetId });
                            closeDialog();
                        },
                    },
                },
            },
            onClose: closeDialog,
        });

        return true;
    },
};
