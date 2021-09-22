import React, { useState } from 'react'

import Chart from './components/Chart/Chart';
import Header from './components/Header/Header';
import ColorPicker from './components/ColorPicker/ColorPicker';

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
      default: null,
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
