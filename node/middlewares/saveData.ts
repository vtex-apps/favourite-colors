export async function saveData(ctx: Context, next: () => Promise<any>) {
  const {
  } = ctx

  // Traer el state del color y el state de la cantidad de votos y guardarlos en la base de datos
  // si hay error catch

  await next()
}
