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
      
      await next()
    } else {
      const {color} = ctx.state.body
      // Levantar el color del state y hacer un getColor() y pasar la cantidad de votos a otro state
      const responseGetColor = await masterdataClient.getColor(color)

      const {votes} = responseGetColor.data
      console.info("votes",votes)
      ctx.state.body.votes = votes
      await next()
      // y hacer next(),
    }
  } catch (error) {
    // si hay error => catch
    console.info('error', error)
    ctx.status = 500
    ctx.body = error
  }
}
