import { LocaleType } from '@univerjs/core'
import { enUS as UniverDesignEnUS } from '@univerjs/design'
import { enUS as UniverDocsUIEnUS } from '@univerjs/docs-ui'
import { enUS as UniverSheetsEnUS } from '@univerjs/sheets'
import { enUS as UniverSheetsUIEnUS } from '@univerjs/sheets-ui'
import { enUS as UniverUiEnUS } from '@univerjs/ui'

import { enUS as CollaborationClientEnUS } from '@univerjs-pro/collaboration-client'
import { enUS as SheetsPrintEnUS } from '@univerjs-pro/sheets-print'
import { enUS as UniverSheetsExchangeClientEnUS } from '@univerjs-pro/sheets-exchange-client'

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
  },
}
