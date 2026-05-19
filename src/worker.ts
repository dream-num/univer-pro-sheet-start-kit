import { createUniver, LocaleType } from '@univerjs/presets'
import { UniverSheetsCoreWorkerPreset } from '@univerjs/preset-sheets-core/worker'
import { UniverSheetsAdvancedWorkerPreset } from '@univerjs/preset-sheets-advanced/worker'
import { UniverSheetsFilterWorkerPreset } from '@univerjs/preset-sheets-filter/worker'

createUniver({
  locale: LocaleType.ZH_CN,
  locales: {
    zhCN: {},
  },
  presets: [
    UniverSheetsCoreWorkerPreset(),
    UniverSheetsAdvancedWorkerPreset({
      // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/license
      // oxlint-disable-next-line node/prefer-global/process
      license: process.env.UNIVER_CLIENT_LICENSE || 'your license.txt',
    }),
    UniverSheetsFilterWorkerPreset(),
  ],
})
