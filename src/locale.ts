import { LocaleType } from '@univerjs/core'
import UniverDesignEnUS from '@univerjs/design/locale/en-US'
import UniverDocsUIEnUS from '@univerjs/docs-ui/locale/en-US'
import UniverSheetsEnUS from '@univerjs/sheets/locale/en-US'
import UniverSheetsUIEnUS from '@univerjs/sheets-ui/locale/en-US'
import UniverUiEnUS from '@univerjs/ui/locale/en-US'
import UniverSheetsConditionalFormattingUiEnUS from '@univerjs/sheets-conditional-formatting-ui/locale/en-US'

import CollaborationClientEnUS from '@univerjs-pro/collaboration-client/locale/en-US'
import SheetsPrintEnUS from '@univerjs-pro/sheets-print/locale/en-US'
import UniverSheetsExchangeClientEnUS from '@univerjs-pro/sheets-exchange-client/locale/en-US'

export const locales = {
  [LocaleType.EN_US]: {
    ...UniverSheetsEnUS,
    ...UniverDocsUIEnUS,
    ...UniverSheetsUIEnUS,
    ...UniverUiEnUS,
    ...UniverDesignEnUS,
    ...CollaborationClientEnUS,
    ...SheetsPrintEnUS,
    ...UniverSheetsExchangeClientEnUS,
    ...UniverSheetsConditionalFormattingUiEnUS,
  },
}
