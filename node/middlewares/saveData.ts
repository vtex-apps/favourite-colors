export async function saveData(ctx: Context, next: () => Promise<any>) {
  const {
    clients: {
      masterdataClient
    }
  } = ctx
  try {
    // Traer el state del color y el state de la cantidad de votos
    const {color, votes} = ctx.state.body
    // y guardarlos en la base de datos
    const body = { votes: (votes + 1)}
    await masterdataClient.updateColor(color, body)
    await next()
  } catch (error) {
    console.info('error', error)
    ctx.status = 500
    ctx.body = error
  }
  // si hay error catch


}
