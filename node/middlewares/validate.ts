import { json } from "co-body"

export async function validate(ctx: Context, next: () => Promise<any>) {

  const {
    clients: {
      masterdataClient
    }
  } = ctx

  ctx.state.body = await json(ctx.req)

  try {
    // Agregar el color a un state
    let {color} = ctx.state.body
    const responseGetAllColors = await masterdataClient.getAllColors()
    const colors = responseGetAllColors.data.map((document: any) => document.id)

    if (color[0]==='#'){
      color = color.substring(1);
    }
    // Validar que el color que pasen en el post sea uno de los permitidos

    if (colors.find((c: any) => c === color)){
      await next()
    } else {
      return
    }

  } catch (error) {
    console.info('error', error)
    ctx.status = 500
    ctx.body = error
  }


  // Si hay un error hacer ctx.body error

}
