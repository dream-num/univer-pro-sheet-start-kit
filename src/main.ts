import './style.css'
import { setupToolbar } from './setup-toolbar'
import { setupUniver } from './setup-univer'

function main() {
  const univerAPI = setupUniver()

  // test on dev
  window.univerAPI = univerAPI

  setupToolbar(univerAPI)
}

main()
