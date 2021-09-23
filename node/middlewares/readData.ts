// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readData(ctx: Context, next: () => Promise<any>) {
  // eslint-disable-next-line no-console
  console.log('Entro al readData')
  const {
    clients: { masterDataClient },
  } = ctx

  try {
    if (ctx.req.method === 'GET') {
      const { data } = await masterDataClient.getAllColors()

      // eslint-disable-next-line array-callback-return
      const colors = data.map((item) => {
        return {
          color: `#${item.id}`,
          votes: item.votes,
        }
      })

      // eslint-disable-next-line no-console
      console.log({ data })

      ctx.body = { colors, message: 'success' }
      ctx.status = 200
      await next()
    } else {
      const { color } = ctx.state.body
      const {
        data: { votes },
      } = await masterDataClient.getColor(color)

      ctx.state.body.votes = votes
      await next()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error })
    ctx.status = 500
    ctx.body = error
  }
}
