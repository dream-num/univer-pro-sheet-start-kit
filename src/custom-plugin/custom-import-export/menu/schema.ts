import type { MenuSchemaType } from '@univerjs/preset-sheets-core';
import { RibbonStartGroup } from '@univerjs/preset-sheets-core';
import { ExportSheetOperation, ImportSheetOperation } from '../commands/operations/exchange.operation';
import {
    ExportSheetMenuItemFactory,
    ImportSheetMenuItemFactory,
    SHEETS_EXCHANGE_OPERATION_ID,
    SheetsExchangeMenuItemFactory,
} from '../controllers/menu';

export const menuSchema: MenuSchemaType = {
    [RibbonStartGroup.OTHERS]: {
        [SHEETS_EXCHANGE_OPERATION_ID]: {
            order: 0.03,
            gridLayout: { row: 1, column: 2, rowSpan: 2, showLabel: true },
            menuItemFactory: SheetsExchangeMenuItemFactory,
            [ImportSheetOperation.id]: {
                order: 0,
                menuItemFactory: ImportSheetMenuItemFactory,
            },
            [ExportSheetOperation.id]: {
                order: 1,
                menuItemFactory: ExportSheetMenuItemFactory,
            },
        },
    },
};
