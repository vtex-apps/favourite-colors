import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'

export default class MasterdataClient extends JanusClient {
  private baseUrl: string = `http://${this.context.account}.vtexcommercestable.com.br/api/dataentities`

  constructor(context: IOContext, options?: InstanceOptions) {
    super(context,
      {
        ...options,
        headers: {
          VtexIdclientAutCookie: context.authToken,
        },
      })
  }

  public async getAllColors() {
    return this.http.getRaw(`${this.baseUrl}/colors/search?_fields=id,votes&_schema=colors`)
  }
  public async getColor(colorId:string){
    return this.http.getRaw(`${this.baseUrl}/colors/documents/${colorId}?_fields=votes`)
  }
  public async updateColor(colorId:string, body: ColorBody){
    return this.http.putRaw(`${this.baseUrl}/colors/documents/${colorId}`, body)
  }
}

interface ColorBody{
  votes: number
}
