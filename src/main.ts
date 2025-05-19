import './style.css'
import { setupToolbar } from './setup-toolbar'
import { setupUniver } from './setup-univer'

function main() {
  const univerAPI = setupUniver()

  // test on dev
  window.univerAPI = univerAPI

  univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
    if (stage === univerAPI.Enum.LifecycleStages.Rendered) {
      setupToolbar(univerAPI)
    }
  })
}

main()
