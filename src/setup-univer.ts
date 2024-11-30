import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import '@univerjs/presets/lib/styles/preset-sheets-advanced.css'
import '@univerjs/presets/lib/styles/preset-sheets-filter.css'
import '@univerjs/presets/lib/styles/preset-sheets-collaboration.css'
import '@univerjs/presets/lib/styles/preset-sheets-thread-comment.css'
import '@univerjs/presets/lib/styles/preset-sheets-conditional-formatting.css'
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css'
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css'
import '@univerjs/presets/lib/styles/preset-sheets-find-replace.css'
import '@univerjs/presets/lib/styles/preset-sheets-hyper-link.css'
import '@univerjs/presets/lib/styles/preset-sheets-sort.css'
import {
  createUniver,
  defaultTheme,
  HTTPService,
  LocaleType,
  LogLevel,
  Tools,
  UniverInstanceType,
  UniverSheetsAdvancedPreset,
  UniverSheetsCollaborationPreset,
  UniverSheetsConditionalFormattingPreset,
  UniverSheetsCorePreset,
  UniverSheetsDataValidationPreset,
  UniverSheetsDrawingPreset,
  UniverSheetsFilterPreset,
  UniverSheetsFindReplacePreset,
  UniverSheetsHyperLinkPreset,
  UniverSheetsSortPreset,
  UniverSheetsThreadCommentPreset,
} from '@univerjs/presets'
import sheetsAdvancedEnUs from '@univerjs/presets/preset-sheets-advanced/locales/en-US'
import sheetsCollaborationEnUs from '@univerjs/presets/preset-sheets-collaboration/locales/en-US'
import sheetsConditionalFormattingEnUs from '@univerjs/presets/preset-sheets-conditional-formatting/locales/en-US'
import sheetsCoreEnUs from '@univerjs/presets/preset-sheets-core/locales/en-US'
import sheetsDataValidationEnUs from '@univerjs/presets/preset-sheets-data-validation/locales/en-US'
import sheetsDrawingEnUs from '@univerjs/presets/preset-sheets-drawing/locales/en-US'
import sheetsFilterEnUs from '@univerjs/presets/preset-sheets-filter/locales/en-US'
import sheetsFindReplaceEnUs from '@univerjs/presets/preset-sheets-find-replace/locales/en-US'
import sheetsHyperLinkEnUs from '@univerjs/presets/preset-sheets-hyper-link/locales/en-US'
import sheetsSortEnUs from '@univerjs/presets/preset-sheets-sort/locales/en-US'
import sheetsThreadCommentEnUs from '@univerjs/presets/preset-sheets-thread-comment/locales/en-US'
import { UniverSheetsCrosshairHighlightPlugin } from '@univerjs/sheets-crosshair-highlight'
import UniverSheetsCrosshairHighlightEnUs from '@univerjs/sheets-crosshair-highlight/locale/en-US'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import sheetsZenEditorEnUs from '@univerjs/sheets-zen-editor/locale/en-US'

import workerURL from './worker.ts?worker&url'

// import { setupUniverDebugPlugin } from './plugins/debug'

export function setupUniver() {
  const universerEndpoint = window.location.origin

  const collaboration = true

  const { univerAPI, univer } = createUniver({
    locale: LocaleType.EN_US,
    locales: {
      [LocaleType.EN_US]: Tools.deepMerge(
        {},
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
        sheetsZenEditorEnUs,
        UniverSheetsCrosshairHighlightEnUs,
      ),
    },
    collaboration,
    logLevel: LogLevel.VERBOSE,
    theme: defaultTheme,
    presets: [
      UniverSheetsCorePreset({
        container: 'univer',
        header: true,
        footer: true,
        workerURL: new Worker(new URL(workerURL, import.meta.url), {
          type: 'module',
        }),
      }),
      UniverSheetsDrawingPreset({
        collaboration,
      }),
      UniverSheetsAdvancedPreset({
        useWorker: true,
        // if univer page is not in the same domain as the server, you need to set the following parameters
        universerEndpoint,
        // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/pro/license
        // eslint-disable-next-line node/prefer-global/process
        license: process.env.UNIVER_CLIENT_LICENSE || 'your license.txt',
      }),
      UniverSheetsCollaborationPreset({
        universerEndpoint,
      }),
      UniverSheetsThreadCommentPreset({
        collaboration,
      }),
      UniverSheetsConditionalFormattingPreset(),
      UniverSheetsDataValidationPreset(),
      UniverSheetsFilterPreset(),
      UniverSheetsFindReplacePreset(),
      UniverSheetsSortPreset(),
      UniverSheetsHyperLinkPreset(),
    ],
    plugins: [
      UniverSheetsCrosshairHighlightPlugin,
      UniverSheetsZenEditorPlugin,
    ],
  })

  // setupUniverDebugPlugin(univer)

  const injector = univer.__getInjector()
  // Maybe you need to add some headers to the request
  const httpService = injector.get(HTTPService)
  httpService.registerHTTPInterceptor({
    priority: 0,
    interceptor: (request, next) => {
      // If you need to add headers to the request, you can do so here
      // // @ts-expect-error
      // const headers: Map<string, string[]> = request.headers._headers
      // // Add your headers here, for example:
      // headers.set('Authorization', ['Bearer 123'])

      return next(request)
    },
  })

  // univer.registerPlugin(UniverSheetsChartPlugin)
  // univer.registerPlugin(UniverSheetsChartUIPlugin)

  // check if the unit is already created
  const url = new URL(window.location.href)
  const unit = url.searchParams.get('unit')
  if (unit) {
    // waiting for the unit to be loaded
  }
  else {
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
    }).then((response) => {
      if (!response.ok)
        throw new Error('Failed to create new sheet')

      return response.json()
    }).then((data) => {
      if (!data.unitID)
        throw new Error('create unit failed')

      url.searchParams.set('unit', data.unitID)
      url.searchParams.set('type', String(UniverInstanceType.UNIVER_SHEET))
      window.location.href = url.toString()
    }).catch((error) => {
      console.error(error)
    })
  }

  return univerAPI
}
