import { 
  ClientsConfig,
  ServiceContext,
  RecorderState,
  LRUCache,
  method,
  Service
} from '@vtex/api'

import { Clients } from './clients'
import { readData } from './middlewares/readData'
import { saveData } from './middlewares/saveData'
import { validate } from './middlewares/validate'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 0 })

metrics.trackCache('status', memoryCache)
 
const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
     status: {
      memoryCache,
    }, 
  },
}

declare global {
  type Context = ServiceContext<Clients, State>
  interface State extends RecorderState {
    //code: number
  }
}

export default new Service({
  clients,
  routes: {
    colors: method({
      GET: [readData],
      POST: [validate, readData ,saveData],
    }),
  },
})
