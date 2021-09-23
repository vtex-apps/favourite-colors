import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { readData } from './middlewares/readData'
import { saveData } from './middlewares/saveData'
import { validate } from './middlewares/validate'

const TIMEOUT_MS = 800

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const memoryCache = new LRUCache<string, any>({ max: 10 })

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
    body: BodyColor
  }

  interface BodyColor {
    color: string
    votes: number
  }
}

export default new Service({
  clients,
  routes: {
    colors: method({
      GET: [readData],
      POST: [validate, readData, saveData],
    }),
  },
})
