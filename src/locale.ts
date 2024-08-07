import { LocaleType, Tools } from '@univerjs/core'
import UniverDesignEnUS from '@univerjs/design/locale/en-US'
import UniverDocsUIEnUS from '@univerjs/docs-ui/locale/en-US'
import UniverSheetsEnUS from '@univerjs/sheets/locale/en-US'
import UniverSheetsUIEnUS from '@univerjs/sheets-ui/locale/en-US'
import UniverUiEnUS from '@univerjs/ui/locale/en-US'
import UniverSheetsConditionalFormattingUiEnUS from '@univerjs/sheets-conditional-formatting-ui/locale/en-US'
import UniverSheetsNumfmtPluginUiEnUS from '@univerjs/sheets-numfmt/locale/en-US'

import CollaborationClientEnUS from '@univerjs-pro/collaboration-client/locale/en-US'
import SheetsPrintEnUS from '@univerjs-pro/sheets-print/locale/en-US'
import UniverExchangeClientEnUS from '@univerjs-pro/exchange-client/locale/en-US'

export const locales = {
  [LocaleType.EN_US]: Tools.deepMerge(
    UniverSheetsEnUS,
    UniverDocsUIEnUS,
    UniverUiEnUS,
    UniverDesignEnUS,
    CollaborationClientEnUS,
    SheetsPrintEnUS,
    UniverExchangeClientEnUS,
    UniverSheetsConditionalFormattingUiEnUS,
    UniverSheetsUIEnUS,
    UniverSheetsNumfmtPluginUiEnUS,
  ),
}
