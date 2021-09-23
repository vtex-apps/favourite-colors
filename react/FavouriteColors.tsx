import React, { useState } from 'react'
import Chart from './components/Chart'
import ColorPicker from './components/ColorPicker'
import Header from './components/Header'

const FavouriteColors = ({ image, title, colors }: FavouriteColorsProps) => {
  const [submitted, setSubmitted] = useState(false)
  console.log("is submitted", submitted)
  return (
    <>
      <Header image={image} title={title} />
      {!submitted ?
        <ColorPicker colors={colors} setSubmitted={setSubmitted} />
        :
        <Chart />
      }
    </>
  )
}

FavouriteColors.schema = {
  title: 'Favourite Colors',
  type: 'object',
  properties: {
    image: {
      title: 'Image Header',
      type: 'string',
      default: 'https://vtexarg.vtexassets.com/assets/vtex.file-manager-graphql/images/b9a84d73-c93f-4ee4-a299-0d0f4d929bc3___a24c847e9489c2d13719ce3b820f07b3.png',
      widget: {
        'ui:widget': 'image-uploader'
      }
    },
    title: {
      title: 'Title Header',
      type: 'string',
      default: 'Color Favorito'
    },
    colors: {
      title: 'Colors',
      type: 'array',
      items: {
        properties: {
          code: {
            tile: 'Color Hexadecimal',
            type: 'string'
          }
        }
      }
    }
  }
}

export default FavouriteColors
