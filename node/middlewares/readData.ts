//import { colors } from '../constants/colors'

export async function readData(ctx: Context, next: () => Promise<any>) {
  const {
    clients: {
      masterdataClient
    }
  } = ctx
  try{
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
      const {color} = ctx.state.body
      // Levantar el color del state y hacer un getColor() y pasar la cantidad de votos a otro state
      const responseGetColor = await masterdataClient.getColor(color)

      const {votes} = responseGetColor.data
      ctx.state.body.votes = votes
      await next()
      // y hacer next(), si hay error => catch

    }
  } catch (error) {
    console.info('error', error)
    ctx.status = 500
    ctx.body = error
  }


  await next()
}
