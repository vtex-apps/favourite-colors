//import { colors } from '../constants/colors'

export async function readData(ctx: Context, next: () => Promise<any>) {
  const {
    clients: {
      masterdataClient
    }
  } = ctx

  if(ctx.req.method === 'GET') {
    console.log('METHOD',ctx.req.method)
    const colors = await masterdataClient.getAllColors()
    const hexColors = colors.data.map((color: { id: string, votes: number})=> {
      return {
        color: `#${color.id}`,
        votes: color.votes
      }
    })
    ctx.body = {colors: hexColors, message: 'Success!!!!!'}
    ctx.status = 200
  } else {

  }

  await next()
}
