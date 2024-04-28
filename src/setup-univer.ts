import '@univerjs/design/lib/index.css'
import '@univerjs/ui/lib/index.css'
import '@univerjs/sheets-ui/lib/index.css'
import '@univerjs/sheets-formula/lib/index.css'
import '@univerjs/sheets-numfmt/lib/index.css'

import { IConfigService, LocaleType, LogLevel, Univer, UniverInstanceType } from '@univerjs/core'
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
import { FUniver } from '@univerjs/facade'

import type {
  ICollaborationClientPluginConfig,
} from '@univerjs-pro/collaboration-client'
import {
  COLLAB_SUBMIT_CHANGESET_URL_KEY,
  COLLAB_WEB_SOCKET_URL_KEY,
  CollaborationClientPlugin,
  SEND_CHANGESET_TIMEOUT_KEY,
  SNAPSHOT_SERVER_URL_KEY,
} from '@univerjs-pro/collaboration-client'
import { CollaborationPlugin } from '@univerjs-pro/collaboration'
import { locales } from './locale'

export function setupUniver() {
  const univer = new Univer({
    theme: defaultTheme,
    locale: LocaleType.EN_US,
    logLevel: LogLevel.VERBOSE,
    locales,
  })

  univer.registerPlugin(UniverDocsPlugin, {
    hasScroll: false,
  })
  univer.registerPlugin(UniverDocsUIPlugin)
  univer.registerPlugin(UniverRenderEnginePlugin)
  univer.registerPlugin(UniverUIPlugin, {
    container: 'univer',
    header: true,
    footer: true,
  })
  univer.registerPlugin(UniverSheetsPlugin)
  univer.registerPlugin(UniverSheetsUIPlugin)

  univer.registerPlugin(UniverSheetsNumfmtPlugin)
  univer.registerPlugin(UniverFormulaEnginePlugin)
  univer.registerPlugin(UniverSheetsFormulaPlugin)

  // collaboration config
  const isSecure = window.location.protocol === 'https:'
  const host = window.location.host
  const apiEndpoint = `${isSecure ? 'https' : 'http'}://${host}`
  const wsEndpoint = `${isSecure ? 'wss' : 'ws'}://${host}`

  const configService = univer.__getInjector().get(IConfigService)
  configService.setConfig(SNAPSHOT_SERVER_URL_KEY, `${apiEndpoint}/universer-api/snapshot`)
  configService.setConfig(COLLAB_SUBMIT_CHANGESET_URL_KEY, `${apiEndpoint}/universer-api/comb`)
  configService.setConfig(COLLAB_WEB_SOCKET_URL_KEY, `${wsEndpoint}/universer-api/comb/connect`)
  configService.setConfig(SEND_CHANGESET_TIMEOUT_KEY, 200)

  // collaboration plugins
  univer.registerPlugin(CollaborationPlugin)
  univer.registerPlugin(CollaborationClientPlugin, {
    enableOfflineEditing: false,
    enableSingleActiveInstanceLock: true,
  } as ICollaborationClientPluginConfig)

  // check if the unit is already created
  const url = new URL(window.location.href)
  const unit = url.searchParams.get('unit')
  if (unit) {
    // waiting for the unit to be loaded
  }
  else {
    fetch(`${apiEndpoint}/universer-api/snapshot/2/unit/-/create`, {
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
