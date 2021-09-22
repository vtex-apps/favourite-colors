import React, { useState } from 'react'

import Chart from './components/Chart';
import Header from './components/Header';
import ColorPicker from './components/ColorPicker';

const FavouriteColor: StorefrontFunctionComponent<FavouriteColorProps> = ({
  image,
  title = "Color Favorito",
  colorsArray
}) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header image={image} title={title} />
      {!submitted ?
        <ColorPicker colorsArray={colorsArray} setSubmitted={setSubmitted} />
        :
        <Chart />
      }
    </>
  )
}

export default FavouriteColor;

FavouriteColor.schema = {
  title: 'Favourite Color',
  type: 'object',
  properties: {
    image: {
      title: 'Imagen Header',
      type: 'string',
      default: 'https://vtexarg.vtexassets.com/assets/vtex.file-manager-graphql/images/b9a84d73-c93f-4ee4-a299-0d0f4d929bc3___a24c847e9489c2d13719ce3b820f07b3.png',
      widget: {
        'ui:widget': 'image-uploader'
      }
    },
    title: {
      title: 'Título',
      type: 'string',
      default: 'Color Favorito',
    },
    colorsArray: {
      title: 'Colors',
      type: 'array',
      items: {
        properties: {
          code: {
            title: 'Color Hexadecimal',
            type: 'string'
          }
        }
      }
    }
  }
}
