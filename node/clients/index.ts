import { IOClients } from '@vtex/api'

import MasterdataClient from './masterdata'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get masterdataClient() {
    return this.getOrSet('masterdataClient', MasterdataClient)
  }
}
