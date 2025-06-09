import type { FUniver, ICellData } from '@univerjs/presets';
import { downloadFile } from '@univerjs/presets/preset-sheets-advanced';

export function setupSetValue($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'set A1 Value'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const value = 'Hello, Univer!'

    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()
    const fRange = fWorksheet.getRange('A1:B2')

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FRange#setvalueforcell
     */
    fRange.setValueForCell(value)
  })
}

export function setupSetValues($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'set A1:B2 values'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const values = [
      ['Hello', { v: 'Univer!', s: { bg: { rgb: '#ff0000' } } }],
      ['Hello', 'Univer!']
    ] as ICellData[][]

    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()
    const fRange = fWorksheet.getRange('A1:B2')

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FRange#setvalues
     */
    fRange.setValues(values)
  })
}

export function setupGetValue($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'get A1 value'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()
    const fRange = fWorksheet.getRange('A1:B2')

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FRange#getvalue
     */
    const A1Value = fRange.getValue()
    console.log(A1Value)
    alert(JSON.stringify(A1Value, null, 2))
  })
}

export function setupGetValues($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'get A1:B2 values'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()
    const fRange = fWorksheet.getRange('A1:B2')

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FRange#getvalues
     */
    const values = fRange.getValues()
    console.log(values)
    alert(JSON.stringify(values, null, 2))
  })
}

export function setupGetWorkbookData($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'get workbook data'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FWorkbook#save
     */
    const snapshot = fWorkbook.save();
    console.log(snapshot)
    alert(JSON.stringify(snapshot, null, 2))
  })
}

export function setupGetSheetData($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'get Sheet1 data'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    
    let fWorksheet = fWorkbook.getSheetByName('Sheet1') ?? fWorkbook.getSheetBySheetId('Sheet1')
    if (!fWorksheet) {
      fWorksheet = fWorkbook.getSheets()[0]
    }

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FWorksheet#getsheet
     */
    const snapshot = fWorksheet?.getSheet().getSnapshot()
    console.log(snapshot)
    alert(JSON.stringify(snapshot, null, 2))
  })
}

export function setupCreateSheet($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'create Sheet2'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FWorkbook#create
     */
    fWorkbook.create('Sheet2', 10, 10);
  })
}

export function setupScrollToCell($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'scroll to B100'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FWorksheet#scrolltocell
     */
    const fRange = fWorksheet.getRange('B100');
    const row = fRange.getRow();
    const column = fRange.getColumn();
    fWorksheet.scrollToCell(row, column);
  })
}

export function setupScrollToTop($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'scroll to top'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FWorksheet#scrolltocell
     */
    fWorksheet.scrollToCell(0, 0);
  })
}

export function setupScrollToBottom($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'scroll to bottom'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FWorksheet#scrolltocell
     */
    fWorksheet.scrollToCell(fWorksheet.getMaxRows() - 1, 0);
  })
}

export function setupSetBackground($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'set A1 background'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()
    const fRange = fWorksheet.getRange('A1')

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FRange#setbackgroundcolor
     */
    fRange.setBackgroundColor('red')
  })
}

export function setupCommandsListenerSwitch($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'start listening commands'
  $toolbar.appendChild($button)
  const el = $button
  let listener: any = null

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    if (listener) {
      listener.dispose()
      listener = null
      el.innerHTML = 'start listening commands'
      return
    }

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FEventName#commandexecuted
     */
    listener = univerAPI.addEvent(univerAPI.Event.CommandExecuted, (event) => {
      const { params, id, type, options } = event;
      console.log('command executed', { params, id, type, options });
    })
    el.innerHTML = 'stop listening commands'
    
    // eslint-disable-next-line no-alert
    alert('Press "Ctrl + Shift + I" to open the console and do some actions in the Univer Sheets, you will see the commands in the console.')
  })
}

export function setupEditSwitch($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'disable edit'
  $toolbar.appendChild($button)
  const el = $button
  let canEdit: boolean = true

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!

    canEdit = !canEdit
    /**
     * @see https://reference.univer.ai/zh-CN/classes/FWorkbook#seteditable
     */
    fWorkbook.setEditable(canEdit)

    el.innerHTML = canEdit ? 'disable edit' : 'enable edit'
  })
}

export function setupUndo($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'undo'
  $toolbar.appendChild($button)

  $button.addEventListener('click', async () => {
    /**
     * @see https://reference.univer.ai/zh-CN/classes/FUniver#undo
     */
    await univerAPI.undo()
  })
}

export function setupRedo($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'redo'
  $toolbar.appendChild($button)

  $button.addEventListener('click', async () => {
    /** 
     * @see https://reference.univer.ai/zh-CN/classes/FUniver#redo
     */
    await univerAPI.redo()
  })
}

export function setupSetSelection($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'select A1:B2'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()
    const fRange = fWorksheet.getRange('A1:B2')

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FRange#activate
     */
    fRange.activate()
  })
}

export function setupClearContent($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'clear A1:B2 content'
  $toolbar.appendChild($button)

  $button.addEventListener('click', async () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()
    const fRange = fWorksheet.getRange('A1:B2')

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FRange#clearcontent
     */
    fRange.clearContent();
  })
}

export function setupClearStyles($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'clear A1:B2 styles'
  $toolbar.appendChild($button)

  $button.addEventListener('click', async () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!
    const fWorksheet = fWorkbook.getActiveSheet()
    const fRange = fWorksheet.getRange('A1:B2')

    /**
     * @see https://reference.univer.ai/zh-CN/classes/FRange#clearformat
     */
    fRange.clearFormat();
  })
}

export function getTheSourceCode($toolbar: HTMLElement, _univerAPI: FUniver) {
  const $button = document.createElement('a')
  const githubIcon = document.createElement('img')
  githubIcon.src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
  githubIcon.style.width = '16px'
  githubIcon.style.height = '16px'
  $button.appendChild(githubIcon)
  $button.appendChild(document.createTextNode('Get the Source Code'))
  $button.style.display = 'flex'
  $button.style.alignItems = 'center'
  $button.style.gap = '4px'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    window.open('https://github.com/dream-num/univer-pro-sheet-start-kit', '_blank')
  })
}

export function goToTheGuide($toolbar: HTMLElement, _univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'read the guide'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    window.open('https://docs.univer.ai/guides/sheets', '_blank')
  })
}

export function setupVersion($toolbar: HTMLElement) {
  const $button = document.createElement('a')
  // eslint-disable-next-line node/prefer-global/process
  $button.textContent = `version: ${process.env.UNIVER_VERSION}`
  $button.href = 'https://github.com/dream-num/univer'
  $button.target = '_blank'
  $toolbar.appendChild($button)
}

export function setupUploadFileToUnitId($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'importXLSXToUnitIdAsync'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.xlsx'
    input.addEventListener('change', async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (!file) return

      const unitId = await univerAPI.importXLSXToUnitIdAsync(file)

      if (!unitId) return

      univerAPI.loadServerUnit(unitId, 2)
    })
    input.click()
  })
}

export function setupDownloadFileByUnitId($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'exportXLSXByUnitIdAsync'
  $toolbar.appendChild($button)

  $button.addEventListener('click', async () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!;
    const unitId = fWorkbook.getId();
    const file = await univerAPI.exportXLSXByUnitIdAsync(unitId);
    if (!file) return;
    downloadFile(file, 'univer', 'xlsx');
  })
}

export function setupUploadFileToSnapshot($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'importXLSXToSnapshotAsync'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.xlsx'
    input.addEventListener('change', async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (!file) return

      const snapshot = await univerAPI.importXLSXToSnapshotAsync(file)

      if (!snapshot) return

      univerAPI.createWorkbook(snapshot)
    })
    input.click()
  })
}

export function setupDownloadFileBySnapshot($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'exportXLSXBySnapshotAsync'
  $toolbar.appendChild($button)

  $button.addEventListener('click', async () => {
    const fWorkbook = univerAPI.getActiveWorkbook()!;
    const snapshot = fWorkbook.save();
    const file = await univerAPI.exportXLSXBySnapshotAsync(snapshot);
    if (!file) return;
    downloadFile(file, 'univer', 'xlsx');
  })
}
