// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveData(ctx: Context, next: () => Promise<any>) {
  // eslint-disable-next-line no-console
  console.log('Entro al saveData')
  const {
    clients: { masterDataClient },
  } = ctx

  try {
    const { color, votes } = ctx.state.body

    // eslint-disable-next-line no-console
    console.log({ color, votes })
    // Sumar voto
    const body = { votes: votes + 1 }

    const response = await masterDataClient.updateColor(color, body)

    ctx.body = { response: response.data, message: 'Vote saved!' }
    ctx.status = response.status
    await next()
  } catch (error) {
    // si hay error catch
    console.info('error', error)
    ctx.status = 500
    ctx.body = error
  }
}
