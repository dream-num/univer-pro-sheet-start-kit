import { createUniver, LocaleType, Tools, UniverSheetsAdvancedWorkerPreset, UniverSheetsCoreWorkerPreset } from '@univerjs/presets'
import sheetsAdvancedZhCN from '@univerjs/presets/preset-sheets-advanced/locales/zh-CN'
import sheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN'

createUniver({
  locale: LocaleType.ZH_CN,
  locales: {
    zhCN: Tools.deepMerge(
      {},
      sheetsCoreZhCN,
      sheetsAdvancedZhCN,
    ),
  },
  presets: [
    UniverSheetsCoreWorkerPreset(),
    UniverSheetsAdvancedWorkerPreset({
      // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/pro/license
      // eslint-disable-next-line node/prefer-global/process
      license: process.env.UNIVER_CLIENT_LICENSE || 'your license.txt',
    }),
  ],
})
