import { UniverActionRecorderPlugin } from '@univerjs/action-recorder'
import type { Univer } from '@univerjs/core'

export function setupUniverDebugPlugin(univer: Univer) {
  const url = new URL(window.location.href)
  const query = url.searchParams
  const isEnableRecord = !!query.get('record')
  if (isEnableRecord) {
    univer.registerPlugin(UniverActionRecorderPlugin)
  }
}
