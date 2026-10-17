import './style.css'
import { setupToolbar } from './setup-toolbar'
import { setupUniver } from './setup-univer'

async function main() {
  const univerAPI = await setupUniver()

  // test on dev
  window.univerAPI = univerAPI

  let toolbarInitialized = false
  univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
    if (!toolbarInitialized && stage >= univerAPI.Enum.LifecycleStages.Rendered) {
      toolbarInitialized = true
      setupToolbar(univerAPI)
    }
  })
}

main().catch(console.error)
