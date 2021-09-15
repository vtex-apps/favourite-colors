import { json } from "co-body"

export async function validate(ctx: Context, next: () => Promise<any>) {

  const {
    clients: {
      masterdataClient
    }
  } = ctx

  ctx.state.body = await json(ctx.req)

  try {
    let {color} = ctx.state.body
    const responseGetAllColors = await masterdataClient.getAllColors()
    const colors = responseGetAllColors.data.map((document: any) => document.id)

    if (color[0]==='#'){
      color = color.substring(1);
    }

    if (colors.find((c: any) => c === color)){
      console.info(true)
      await next()
    } else {
      console.info(false)
      return
    }

  } catch (error) {
    console.info('error', error)
    // ctx.state = 500
    ctx.body = error
  }

  // Validar que el color que pasen en el post sea uno de los permitidos
  // Agregar el color a un state
  // Si hay un error hacer ctx.body error

}
