import { createUniver, defaultTheme, LocaleType, LogLevel, mergeLocales, UniverInstanceType } from '@univerjs/presets'

import { HTTPService, UniverSheetsCorePreset } from '@univerjs/preset-sheets-core'
import sheetsCoreArSa from '@univerjs/preset-sheets-core/locales/ar-SA'
import sheetsCoreEnUs from '@univerjs/preset-sheets-core/locales/en-US'
import '@univerjs/preset-sheets-core/lib/index.css'

import { UniverSheetsAdvancedPreset } from '@univerjs/preset-sheets-advanced'
import sheetsAdvancedArSa from '@univerjs/preset-sheets-advanced/locales/ar-SA'
import sheetsAdvancedEnUs from '@univerjs/preset-sheets-advanced/locales/en-US'
import '@univerjs/preset-sheets-advanced/lib/index.css'

import { UniverSheetsCollaborationPreset } from '@univerjs/preset-sheets-collaboration'
import sheetsCollaborationArSa from '@univerjs/preset-sheets-collaboration/locales/ar-SA'
import sheetsCollaborationEnUs from '@univerjs/preset-sheets-collaboration/locales/en-US'
import '@univerjs/preset-sheets-collaboration/lib/index.css'

import { UniverSheetsThreadCommentPreset } from '@univerjs/preset-sheets-thread-comment'
import sheetsThreadCommentArSa from '@univerjs/preset-sheets-thread-comment/locales/ar-SA'
import sheetsThreadCommentEnUs from '@univerjs/preset-sheets-thread-comment/locales/en-US'
import '@univerjs/preset-sheets-thread-comment/lib/index.css'

import { UniverSheetsConditionalFormattingPreset } from '@univerjs/preset-sheets-conditional-formatting'
import sheetsConditionalFormattingArSa from '@univerjs/preset-sheets-conditional-formatting/locales/ar-SA'
import sheetsConditionalFormattingEnUs from '@univerjs/preset-sheets-conditional-formatting/locales/en-US'
import '@univerjs/preset-sheets-conditional-formatting/lib/index.css'

import { UniverSheetsDataValidationPreset } from '@univerjs/preset-sheets-data-validation'
import sheetsDataValidationArSa from '@univerjs/preset-sheets-data-validation/locales/ar-SA'
import sheetsDataValidationEnUs from '@univerjs/preset-sheets-data-validation/locales/en-US'
import '@univerjs/preset-sheets-data-validation/lib/index.css'

import { UniverSheetsDrawingPreset } from '@univerjs/preset-sheets-drawing'
import sheetsDrawingArSa from '@univerjs/preset-sheets-drawing/locales/ar-SA'
import sheetsDrawingEnUs from '@univerjs/preset-sheets-drawing/locales/en-US'
import '@univerjs/preset-sheets-drawing/lib/index.css'

import { UniverSheetsFilterPreset } from '@univerjs/preset-sheets-filter'
import sheetsFilterArSa from '@univerjs/preset-sheets-filter/locales/ar-SA'
import sheetsFilterEnUs from '@univerjs/preset-sheets-filter/locales/en-US'
import '@univerjs/preset-sheets-filter/lib/index.css'

import { UniverSheetsFindReplacePreset } from '@univerjs/preset-sheets-find-replace'
import sheetsFindReplaceArSa from '@univerjs/preset-sheets-find-replace/locales/ar-SA'
import sheetsFindReplaceEnUs from '@univerjs/preset-sheets-find-replace/locales/en-US'
import '@univerjs/preset-sheets-find-replace/lib/index.css'

import { UniverSheetsHyperLinkPreset } from '@univerjs/preset-sheets-hyper-link'
import sheetsHyperLinkArSa from '@univerjs/preset-sheets-hyper-link/locales/ar-SA'
import sheetsHyperLinkEnUs from '@univerjs/preset-sheets-hyper-link/locales/en-US'
import '@univerjs/preset-sheets-hyper-link/lib/index.css'

import { UniverSheetsSortPreset } from '@univerjs/preset-sheets-sort'
import sheetsSortArSa from '@univerjs/preset-sheets-sort/locales/ar-SA'
import sheetsSortEnUs from '@univerjs/preset-sheets-sort/locales/en-US'
import '@univerjs/preset-sheets-sort/lib/index.css'

import { UniverSheetsNotePreset } from '@univerjs/preset-sheets-note'
import sheetsNoteArSa from '@univerjs/preset-sheets-note/locales/ar-SA'
import sheetsNoteEnUs from '@univerjs/preset-sheets-note/locales/en-US'
import '@univerjs/preset-sheets-note/lib/index.css'

import { UniverSheetsTablePreset } from '@univerjs/preset-sheets-table'
import sheetsTableArSa from '@univerjs/preset-sheets-table/locales/ar-SA'
import sheetsTableEnUs from '@univerjs/preset-sheets-table/locales/en-US'
import '@univerjs/preset-sheets-table/lib/index.css'

import { UniverSheetsCrosshairHighlightPlugin } from '@univerjs/sheets-crosshair-highlight'
import sheetsCrosshairHighlightArSa from '@univerjs/sheets-crosshair-highlight/locale/ar-SA'
import sheetsCrosshairHighlightEnUs from '@univerjs/sheets-crosshair-highlight/locale/en-US'
import '@univerjs/sheets-crosshair-highlight/lib/index.css'

// oxlint-disable-next-line import/default
import workerURL from './worker.ts?worker&url'

// import { setupUniverDebugPlugin } from './plugins/debug'

export function setupUniver() {
  const universerEndpoint = window.location.origin

  const collaboration = true

  const { univerAPI, univer } = createUniver({
    locale: LocaleType.EN_US,
    // locale: LocaleType.AR_SA,
    locales: {
      [LocaleType.EN_US]: mergeLocales(
        sheetsCoreEnUs,
        sheetsAdvancedEnUs,
        sheetsCollaborationEnUs,
        sheetsThreadCommentEnUs,
        sheetsConditionalFormattingEnUs,
        sheetsDataValidationEnUs,
        sheetsDrawingEnUs,
        sheetsFilterEnUs,
        sheetsFindReplaceEnUs,
        sheetsHyperLinkEnUs,
        sheetsSortEnUs,
        sheetsNoteEnUs,
        sheetsTableEnUs,
        sheetsCrosshairHighlightEnUs,
      ),
      [LocaleType.AR_SA]: mergeLocales(
        sheetsCoreArSa,
        sheetsAdvancedArSa,
        sheetsCollaborationArSa,
        sheetsThreadCommentArSa,
        sheetsConditionalFormattingArSa,
        sheetsDataValidationArSa,
        sheetsDrawingArSa,
        sheetsFilterArSa,
        sheetsFindReplaceArSa,
        sheetsHyperLinkArSa,
        sheetsSortArSa,
        sheetsNoteArSa,
        sheetsTableArSa,
        sheetsCrosshairHighlightArSa,
      ),
    },
    // direction: 'rtl',
    collaboration,
    logLevel: LogLevel.VERBOSE,
    theme: defaultTheme,
    presets: [
      UniverSheetsCorePreset({
        container: 'univer',
        header: true,
        workerURL: new Worker(new URL(workerURL, import.meta.url), {
          type: 'module',
        }),
        ribbonType: 'grid',
        // footer: {
        //   addSheetButtonConfig: {
        //     // show: false,
        //     defaultRowCount: 10,
        //     defaultColumnCount: 5,
        //   },
        // },
      }),
      UniverSheetsDrawingPreset({
        collaboration,
        // allowImageSize: 0.01 * 1024 * 1024, // 10KB
      }),
      UniverSheetsAdvancedPreset({
        useWorker: true,
        // if univer page is not in the same domain as the server, you need to set the following parameters
        universerEndpoint,
        // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/license
        // oxlint-disable-next-line node/prefer-global/process
        license: process.env.UNIVER_CLIENT_LICENSE || 'your license.txt',
        exchangeClientOptions: {
          minSheetRowCount: 100,
          minSheetColumnCount: 12,
          // enableServerSideComputing: true,
        },
      }),
      UniverSheetsCollaborationPreset({
        universerEndpoint,
        univerContainerId: 'univer',
      }),
      UniverSheetsThreadCommentPreset({
        collaboration,
      }),
      UniverSheetsConditionalFormattingPreset(),
      UniverSheetsDataValidationPreset(),
      UniverSheetsFilterPreset({
        enableSyncSwitch: true,
      }),
      UniverSheetsFindReplacePreset(),
      UniverSheetsSortPreset(),
      UniverSheetsNotePreset(),
      UniverSheetsTablePreset(),
      UniverSheetsHyperLinkPreset(),
    ],
    plugins: [UniverSheetsCrosshairHighlightPlugin],
  })

  // setupUniverDebugPlugin(univer)

  const injector = univer.__getInjector()
  // Maybe you need to add some headers to the request
  const httpService = injector.get(HTTPService)
  httpService.registerHTTPInterceptor({
    priority: 0,
    interceptor: (request, next) => {
      // If you need to add headers to the request, you can do so here
      // Add your headers here, for example:
      // request.headers.set('Authorization', 'Bearer 123')
      return next(request)
    },
  })

  // check if the unit is already created
  const url = new URL(window.location.href)
  const unit = url.searchParams.get('unit')
  if (unit) {
    // waiting for the unit to be loaded
  } else {
    fetch(`${universerEndpoint}/universer-api/snapshot/2/unit/-/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: UniverInstanceType.UNIVER_SHEET,
        name: 'New Sheet By Univer',
        creator: 'user',
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to create new sheet')

        return response.json()
      })
      .then((data) => {
        if (!data.unitID) throw new Error('create unit failed')

        url.searchParams.set('unit', data.unitID)
        url.searchParams.set('type', String(UniverInstanceType.UNIVER_SHEET))
        window.location.href = url.toString()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return univerAPI
}
