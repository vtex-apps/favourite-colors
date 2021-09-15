export async function validate(ctx: Context, next: () => Promise<any>) {
  const {
  } = ctx
  // Validar que el color que pasen en el post sea uno de los permitidos
  // Agregar el color a un state
  // Si hay un error hacer ctx.body error
  await next()
}
