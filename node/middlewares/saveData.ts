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
    console.info("body",body)
    const response = await masterdataClient.updateColor(color, body)
    ctx.body = {response: response.data, message: "Voto guardado"}
    ctx.status = response.status
    await next()
  } catch (error) {
    // si hay error catch
    console.info('error', error)
    ctx.status = 500
    ctx.body = error
    await next()
  }
}
