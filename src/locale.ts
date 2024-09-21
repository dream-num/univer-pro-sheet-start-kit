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
import EditHistoryViewerEnUS from '@univerjs-pro/edit-history-viewer/locale/en-US'
import UniverSheetsPivotEnUs from '@univerjs-pro/sheets-pivot/locale/en-US'
import UniverSheetsPivotUiEnUs from '@univerjs-pro/sheets-pivot-ui/locale/en-US'
import UniverSheetsThreadCommentEnUs from '@univerjs/sheets-thread-comment/locale/en-US'
import UniverThreadCommentUiEnUs from '@univerjs/thread-comment-ui/locale/en-US'
import FindReplaceZhCN from '@univerjs/find-replace/locale/zh-CN'
import SheetsFindReplaceZhCN from '@univerjs/sheets-find-replace/locale/zh-CN'

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
    EditHistoryViewerEnUS,
    UniverSheetsPivotEnUs,
    UniverSheetsPivotUiEnUs,
    UniverSheetsThreadCommentEnUs,
    UniverThreadCommentUiEnUs,
    FindReplaceZhCN,
    SheetsFindReplaceZhCN,
  ),
}
