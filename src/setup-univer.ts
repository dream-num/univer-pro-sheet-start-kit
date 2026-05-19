import { createUniver, defaultTheme, LocaleType, LogLevel, mergeLocales, UniverInstanceType } from '@univerjs/presets'

import { CalculationMode, HTTPService, UniverSheetsCorePreset } from '@univerjs/preset-sheets-core'
import sheetsCoreEnUs from '@univerjs/preset-sheets-core/locales/en-US'
import '@univerjs/preset-sheets-core/lib/index.css'

import { UniverSheetsAdvancedPreset } from '@univerjs/preset-sheets-advanced'
import sheetsAdvancedEnUs from '@univerjs/preset-sheets-advanced/locales/en-US'
import '@univerjs/preset-sheets-advanced/lib/index.css'

import { UniverSheetsCollaborationPreset } from '@univerjs/preset-sheets-collaboration'
import sheetsCollaborationEnUs from '@univerjs/preset-sheets-collaboration/locales/en-US'
import '@univerjs/preset-sheets-collaboration/lib/index.css'

import { UniverSheetsThreadCommentPreset } from '@univerjs/preset-sheets-thread-comment'
import sheetsThreadCommentEnUs from '@univerjs/preset-sheets-thread-comment/locales/en-US'
import '@univerjs/preset-sheets-thread-comment/lib/index.css'

import { UniverSheetsConditionalFormattingPreset } from '@univerjs/preset-sheets-conditional-formatting'
import sheetsConditionalFormattingEnUs from '@univerjs/preset-sheets-conditional-formatting/locales/en-US'
import '@univerjs/preset-sheets-conditional-formatting/lib/index.css'

import { UniverSheetsDataValidationPreset } from '@univerjs/preset-sheets-data-validation'
import sheetsDataValidationEnUs from '@univerjs/preset-sheets-data-validation/locales/en-US'
import '@univerjs/preset-sheets-data-validation/lib/index.css'

import { UniverSheetsDrawingPreset } from '@univerjs/preset-sheets-drawing'
import sheetsDrawingEnUs from '@univerjs/preset-sheets-drawing/locales/en-US'
import '@univerjs/preset-sheets-drawing/lib/index.css'

import { UniverSheetsFilterPreset } from '@univerjs/preset-sheets-filter'
import sheetsFilterEnUs from '@univerjs/preset-sheets-filter/locales/en-US'
import '@univerjs/preset-sheets-filter/lib/index.css'

import { UniverSheetsFindReplacePreset } from '@univerjs/preset-sheets-find-replace'
import sheetsFindReplaceEnUs from '@univerjs/preset-sheets-find-replace/locales/en-US'
import '@univerjs/preset-sheets-find-replace/lib/index.css'

import { UniverSheetsHyperLinkPreset } from '@univerjs/preset-sheets-hyper-link'
import sheetsHyperLinkEnUs from '@univerjs/preset-sheets-hyper-link/locales/en-US'
import '@univerjs/preset-sheets-hyper-link/lib/index.css'

import { UniverSheetsSortPreset } from '@univerjs/preset-sheets-sort'
import sheetsSortEnUs from '@univerjs/preset-sheets-sort/locales/en-US'
import '@univerjs/preset-sheets-sort/lib/index.css'

import { UniverSheetsNotePreset } from '@univerjs/preset-sheets-note'
import sheetsNoteEnUs from '@univerjs/preset-sheets-note/locales/en-US'
import '@univerjs/preset-sheets-note/lib/index.css'

import { UniverSheetsTablePreset } from '@univerjs/preset-sheets-table'
import sheetsTableEnUs from '@univerjs/preset-sheets-table/locales/en-US'
import '@univerjs/preset-sheets-table/lib/index.css'

import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import sheetsZenEditorEnUs from '@univerjs/sheets-zen-editor/locale/en-US'
import '@univerjs/sheets-zen-editor/lib/index.css'

import { UniverSheetsCrosshairHighlightPlugin } from '@univerjs/sheets-crosshair-highlight'
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
        sheetsZenEditorEnUs,
        sheetsCrosshairHighlightEnUs,
      ),
    },
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
        formula: {
          initialFormulaComputing: CalculationMode.FORCED,
        },
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
    plugins: [UniverSheetsCrosshairHighlightPlugin, UniverSheetsZenEditorPlugin],
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
