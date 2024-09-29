import type { FUniver } from '@univerjs-pro/facade'
import { getTheSourceCode, goToTheGuide, setupClearStyles, setupCommandsListenerSwitch, setupCreateSheet, setupEditSwitch, setupGetSheetData, setupGetValue, setupGetWorkbookData, setupRedo, setupScrollToBottom, setupScrollToCell, setupScrollToTop, setupSetBackground, setupSetSelection, setupSetValue, setupSetValues, setupUndo } from './api'

export function setupToolbar(univerAPI: FUniver) {
  const $toolbar = document.getElementById('toolbar')!

  setupSetValue($toolbar, univerAPI)
  setupSetValues($toolbar, univerAPI)
  setupGetValue($toolbar, univerAPI)
  setupGetValue($toolbar, univerAPI)
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
  setupClearStyles($toolbar, univerAPI)

  goToTheGuide($toolbar, univerAPI)
  getTheSourceCode($toolbar, univerAPI)
}
