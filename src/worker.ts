import { LogLevel, Univer } from '@univerjs/core'
import { UniverProFormulaEnginePlugin } from '@univerjs-pro/engine-formula'
import { UniverRPCWorkerThreadPlugin } from '@univerjs/rpc'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverRemoteSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverLicensePlugin } from '@univerjs-pro/license'
import { UniverSheetsPivotTablePlugin } from '@univerjs-pro/sheets-pivot'

// Univer web worker is also a univer application.
const univer = new Univer({
  logLevel: LogLevel.VERBOSE,
  locales: {},
})

univer.registerPlugin(UniverLicensePlugin, {
  // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/pro/license
  // eslint-disable-next-line node/prefer-global/process
  license: process.env.UNIVER_CLIENT_LICENSE || 'your license.txt',
})
univer.registerPlugin(UniverSheetsPlugin, { onlyRegisterFormulaRelatedMutations: true })
univer.registerPlugin(UniverProFormulaEnginePlugin)
univer.registerPlugin(UniverRPCWorkerThreadPlugin)
univer.registerPlugin(UniverRemoteSheetsFormulaPlugin)

univer.registerPlugin(UniverSheetsPivotTablePlugin, {
  notExecuteFormula: true,
})

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
globalThis.univer = univer
