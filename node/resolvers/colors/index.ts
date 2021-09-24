/* eslint-disable @typescript-eslint/no-explicit-any */
export const queries = {
    getAllColors: async (_: unknown, {}:any, ctx: Context): Promise<any> => {
        const colorsResponse = await ctx.clients.masterdataClient.getAllColors()

        const hexColors = colorsResponse.data.map((color: { id: string, votes: number})=> {
            return {
              color: `#${color.id}`,
              votes: color.votes
            }
          })

        return {colors: hexColors, message: 'Success'}
    },
}

export const mutations = {
    updateColor: async (
      _: unknown,
      { colorId }: any,
      ctx: Context
    ): Promise<any> => {
        try {
            if (colorId[0]==='#'){
                colorId = colorId.substring(1);
            }
            console.log({colorId})
            const { data } = await ctx.clients.masterdataClient.getAllColors()
            console.log({data})
            const continuar = data.find((c: any) => c.id === colorId)
            console.log({continuar})
            if (continuar){
                const { data: { votes } } = await ctx.clients.masterdataClient.getColor(colorId)
    
                const body = {
                    votes : votes + 1
                }
        
                const { status } = await ctx.clients.masterdataClient.updateColor(colorId,body)
        
                return { response: `Color #${colorId} successfully updated with ${votes+1} votes!`, status: status}
            } else {
    
                return { response: 'Color not allowed', status: 404}
            }
        } catch (err) {
            console.error(err)

            return { response: err.message, status: err.status}
        }
    },
  }