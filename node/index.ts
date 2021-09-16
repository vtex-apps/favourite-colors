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
import { resolvers } from './resolvers'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 20 })

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

  interface BodyColor {
    color: string
    votes: number
  }

  interface State extends RecorderState {
    body: BodyColor
  }

}

export default new Service<Clients, RecorderState, Context>({
  clients,
  routes: {
    colors: method({
      GET: [readData],
      POST: [validate, readData ,saveData],
    }),
  },
  graphql: {
    resolvers,
  },
})
