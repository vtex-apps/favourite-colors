export async function validate(ctx: Context, next: () => Promise<any>) {
  const {
  } = ctx

  await next()
}
