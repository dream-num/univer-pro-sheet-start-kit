import type { FUniver } from '@univerjs/presets'

import {
  getTheSourceCode,
  goToTheGuide,
  setupClearContent,
  setupClearStyles,
  setupCommandsListenerSwitch,
  setupCreateSheet,
  setupEditSwitch,
  setupGetSheetData,
  setupGetValue,
  setupGetValues,
  setupGetWorkbookData,
  setupRedo,
  setupScrollToBottom,
  setupScrollToCell,
  setupScrollToTop,
  setupSetBackground,
  setupSetSelection,
  setupSetValue,
  setupSetValues,
  setupUndo,
  setupUploadFileToUnitId,
  setupDownloadFileByUnitId,
  setupUploadFileToSnapshot,
  setupDownloadFileBySnapshot,
  setupVersion,
} from './api'

export function setupToolbar(univerAPI: FUniver) {
  const $toolbar = document.getElementById('toolbar')!
  setupSetValue($toolbar, univerAPI)
  setupSetValues($toolbar, univerAPI)
  setupGetValue($toolbar, univerAPI)
  setupGetValues($toolbar, univerAPI)

  setupGetWorkbookData($toolbar, univerAPI)
  setupGetSheetData($toolbar, univerAPI)
  setupCreateSheet($toolbar, univerAPI)

  setupScrollToCell($toolbar, univerAPI)
  setupScrollToTop($toolbar, univerAPI)
  setupScrollToBottom($toolbar, univerAPI)

  setupSetBackground($toolbar, univerAPI)

  setupCommandsListenerSwitch($toolbar, univerAPI)
  setupEditSwitch($toolbar, univerAPI)

  setupUndo($toolbar, univerAPI)
  setupRedo($toolbar, univerAPI)

  setupSetSelection($toolbar, univerAPI)
  setupClearContent($toolbar, univerAPI)
  setupClearStyles($toolbar, univerAPI)

  goToTheGuide($toolbar, univerAPI)
  getTheSourceCode($toolbar, univerAPI)

  setupUploadFileToUnitId($toolbar, univerAPI)
  setupDownloadFileByUnitId($toolbar, univerAPI)
  setupUploadFileToSnapshot($toolbar, univerAPI)
  setupDownloadFileBySnapshot($toolbar, univerAPI)
  setupVersion($toolbar)
}
