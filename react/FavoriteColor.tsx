import React, { useState } from 'react';
import BarChart from './components/BarChart/BarChart';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Header from './components/Header/Header';

const data = [
  {
    color: "#6182F5",
    votes: 0
  },
  {
    color: "#32A1B5",
    votes: 0
  },
  {
    color: "#DF5F5F",
    votes: 0
  },
  {
    color: "#5FD7DF",
    votes: 0
  },
  {
    color: "#C15FC3",
    votes: 0
  },
  {
    color: "#8FE793",
    votes: 5
  },
  {
    color: "#F2F561",
    votes: 7
  }
]

const FavoriteColor: StorefrontFunctionComponent<FavoriteColorProps> = ({
  image,
  title = 'Color Favorito',
  colors
}) => {
  const [submited, setSubmited] = useState(false);
  console.log("colors", colors)

  const sendCode = (selected: string) => {
    console.log("click", selected)
    setSubmited(true)
  }

  return (
    <>
      <Header image={image} title={title} />
      {
        !submited ?
          <ColorPicker onClick={sendCode} colors={colors} />
          :
          <BarChart data={data} />
      }
    </>
  )
}

export default FavoriteColor;

FavoriteColor.schema = {
  title: 'admin/editor.colors.title',
  description: 'admin/editor.colors.description',
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
    colors: {
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
    },
  },
}
