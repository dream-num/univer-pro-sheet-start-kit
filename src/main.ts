import './style.css'

import { setupUniver } from './setup-univer'
import { setupToolbar } from './setup-toolbar'

function main() {
  const univerAPI = setupUniver()
  setupToolbar(univerAPI)
}

main()
