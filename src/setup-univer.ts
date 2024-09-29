/* eslint-disable node/prefer-global/process */

import '@univerjs/design/lib/index.css'
import '@univerjs/ui/lib/index.css'
import '@univerjs/sheets-ui/lib/index.css'
import '@univerjs/sheets-formula/lib/index.css'
import '@univerjs/sheets-numfmt/lib/index.css'
import '@univerjs/sheets-conditional-formatting-ui/lib/index.css'

import '@univerjs-pro/collaboration-client/lib/index.css'
// import '@univerjs-pro/live-share/lib/index.css'
import '@univerjs-pro/sheets-print/lib/index.css'
import '@univerjs-pro/exchange-client/lib/index.css'
import '@univerjs-pro/edit-history-viewer/lib/index.css'
import '@univerjs-pro/sheets-pivot-ui/lib/index.css'
import '@univerjs/thread-comment-ui/lib/index.css'
import '@univerjs/sheets-crosshair-highlight/lib/index.css'
import '@univerjs/find-replace/lib/index.css'

import { IAuthzIoService, IConfigService, IUndoRedoService, LocaleType, LogLevel, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverUIPlugin } from '@univerjs/ui'
import { UniverSheetsConditionalFormattingUIPlugin } from '@univerjs/sheets-conditional-formatting-ui'
import { FUniver } from '@univerjs-pro/facade'

import { UniverCollaborationPlugin } from '@univerjs-pro/collaboration'
import { UniverCollaborationClientPlugin } from '@univerjs-pro/collaboration-client'
// import { UniverLiveSharePlugin } from '@univerjs-pro/live-share'
import { UniverSheetsPrintPlugin } from '@univerjs-pro/sheets-print'
import { UniverExchangeClientPlugin } from '@univerjs-pro/exchange-client'
import { UniverSheetsExchangeClientPlugin } from '@univerjs-pro/sheets-exchange-client'
import { UniverSheetsPivotTablePlugin } from '@univerjs-pro/sheets-pivot'
import { UniverSheetsPivotTableUIPlugin } from '@univerjs-pro/sheets-pivot-ui'
import { UniverEditHistoryLoaderPlugin } from '@univerjs-pro/edit-history-loader'
import { UniverSheetsThreadCommentPlugin } from '@univerjs/sheets-thread-comment'
import { UniverSheetsCrosshairHighlightPlugin } from '@univerjs/sheets-crosshair-highlight'
import { UniverFindReplacePlugin } from '@univerjs/find-replace'
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace'
import { UniverLicensePlugin } from '@univerjs-pro/license'

// #region Drawing
import { IImageIoService, UniverDrawingPlugin } from '@univerjs/drawing'
import { UniverDrawingUIPlugin } from '@univerjs/drawing-ui'
import { UniverSheetsDrawingPlugin } from '@univerjs/sheets-drawing'
import { UniverSheetsDrawingUIPlugin } from '@univerjs/sheets-drawing-ui'
// #endregion

import { HTTPService } from '@univerjs/network'

import { locales } from './locale'

export function setupUniver() {
  const univer = new Univer({
    theme: defaultTheme,
    locale: LocaleType.EN_US,
    logLevel: LogLevel.VERBOSE,
    locales,
    // When enabling the collaboration plugin, set the built-in implementation to `null`.
    // This avoids double injection issues since the plugin injects its own implementation.
    // Failure to do so will result in conflicts and errors.
    override: [
      [IAuthzIoService, null],
      [IUndoRedoService, null],
    ],
  })

  univer.registerPlugin(UniverLicensePlugin, {
    // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/pro/license
    license: process.env.UNIVER_CLIENT_LICENSE || 'your license.txt',
  })

  univer.registerPlugin(UniverRenderEnginePlugin)

  univer.registerPlugin(UniverDocsPlugin, {
    hasScroll: false,
  })
  univer.registerPlugin(UniverUIPlugin, {
    container: 'univer',
    header: true,
    footer: true,
  })
  univer.registerPlugin(UniverSheetsPlugin)
  univer.registerPlugin(UniverSheetsUIPlugin)
  univer.registerPlugin(UniverDocsUIPlugin)

  univer.registerPlugin(UniverSheetsNumfmtPlugin)
  univer.registerPlugin(UniverFormulaEnginePlugin)
  univer.registerPlugin(UniverSheetsFormulaPlugin)
  univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin)

  // #region Drawing
  univer.registerPlugin(UniverDrawingPlugin, {
    override: [
      [IImageIoService, null], // with CollaborationClientPlugin
    ],
  })
  univer.registerPlugin(UniverDrawingUIPlugin)
  univer.registerPlugin(UniverSheetsDrawingPlugin)
  univer.registerPlugin(UniverSheetsDrawingUIPlugin)
  // #endregion

  // find-replace
  univer.registerPlugin(UniverFindReplacePlugin)
  univer.registerPlugin(UniverSheetsFindReplacePlugin)

  const injector = univer.__getInjector()
  const configService = injector.get(IConfigService)

  const universerEndpoint = window.location.host

  // need equal to the container id, history viewer will use this id to find the container
  configService.setConfig('UNIVER_CONTAINER_ID', `univer`)
  univer.registerPlugin(UniverEditHistoryLoaderPlugin)

  // collaboration plugins
  univer.registerPlugin(UniverCollaborationPlugin)
  univer.registerPlugin(UniverCollaborationClientPlugin, {
    authzUrl: `http://${universerEndpoint}/universer-api/authz`,
    snapshotServerUrl: `http://${universerEndpoint}/universer-api/snapshot`,
    collabSubmitChangesetUrl: `http://${universerEndpoint}/universer-api/comb`,
    collabWebSocketUrl: `ws://${universerEndpoint}/universer-api/comb/connect`,
    sendChangesetTimeout: 200,
  })

  // univer.registerPlugin(UniverLiveSharePlugin)

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

  // print
  univer.registerPlugin(UniverSheetsPrintPlugin)

  // exchange
  univer.registerPlugin(UniverExchangeClientPlugin, {
    uploadFileServerUrl: `http://${universerEndpoint}/universer-api/stream/file/upload`,
    importServerUrl: `http://${universerEndpoint}/universer-api/exchange/{type}/import`,
    exportServerUrl: `http://${universerEndpoint}/universer-api/exchange/{type}/export`,
    getTaskServerUrl: `http://${universerEndpoint}/universer-api/exchange/task/{taskID}`,
    signUrlServerUrl: `http://${universerEndpoint}/universer-api/file/{fileID}/sign-url`,
  })
  univer.registerPlugin(UniverSheetsExchangeClientPlugin)

  // pivot table
  univer.registerPlugin(UniverSheetsPivotTablePlugin)
  univer.registerPlugin(UniverSheetsPivotTableUIPlugin)
  univer.registerPlugin(UniverSheetsThreadCommentPlugin)
  univer.registerPlugin(UniverSheetsCrosshairHighlightPlugin)

  // univer.registerPlugin(UniverThreadCommentDataSourcePlugin)

  // check if the unit is already created
  const url = new URL(window.location.href)
  const unit = url.searchParams.get('unit')
  if (unit) {
    // waiting for the unit to be loaded
  }
  else {
    fetch(`http://${universerEndpoint}/universer-api/snapshot/2/unit/-/create`, {
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

  return FUniver.newAPI(univer)
}
