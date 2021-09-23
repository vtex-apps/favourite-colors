import { UserInputError } from '@vtex/api'
import { json } from 'co-body'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validate(ctx: Context, next: () => Promise<any>) {
  // eslint-disable-next-line no-console
  console.log('Entro al validate')
  const {
    clients: { masterDataClient },
  } = ctx

  const { color } = await json(ctx.req)

  if (!color) {
    throw new UserInputError(
      `The request is invalid: The color field is required`
    )
  }

  try {
    if (color[0] === '#') color.substring(1)

    const { data } = await masterDataClient.getAllColors()

    const idList = data.map((item) => item.id)

    if (idList.find((item) => item === color)) {
      const bodyColor: BodyColor = {
        color,
        votes: 0,
      }

      ctx.state.body = bodyColor
      await next()
    } else {
      ctx.body = {
        message: 'Color not allowed',
      }
      ctx.status = 400

      return
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error })
    ctx.body = error
    ctx.status = 500
  }
}
