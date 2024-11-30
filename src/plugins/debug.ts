import type { Univer } from '@univerjs/presets'

import { ActionReplayService, UniverActionRecorderPlugin } from '@univerjs/action-recorder'

export function setupUniverDebugPlugin(univer: Univer) {
  const url = new URL(window.location.href)
  const query = url.searchParams
  const isEnableRecord = !!query.get('record')
  if (isEnableRecord) {
    univer.registerPlugin(UniverActionRecorderPlugin, { replayOnly: !isEnableRecord })
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    window.actionReplayAPI = univer.__getInjector().get(ActionReplayService)
  }
}
