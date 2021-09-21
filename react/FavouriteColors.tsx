import React, { useState } from 'react'
import Header from './components/Header/Header';
import { useCssHandles } from 'vtex.css-handles';
import ColorButton from './components/ColorButton/ColorButton';
import { Button } from 'vtex.styleguide'

const CSS_HANDLES = [
  'colorPicker--container',
  'colorPicker--title',
]

const FavouriteColor: StorefrontFunctionComponent<FavouriteColorProps> = ({
  image,
  title = "Color Favorito",
  colorsArray
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [selected, setSelected] = useState('');
  return (
    <>
      <Header image={image} title={title} />
      <main className={`ma8`} >
        <h2 className={`mv8 ${handles['colorPicker--title']}`}>Elegí tu color favorito</h2>
        <div className={`mv8 flex ${handles['colorPicker--container']}`}>
          {colorsArray && colorsArray.map((item: ColorButtonProps, index: number) =>
            <ColorButton
              onClick={setSelected}
              selected={selected}
              code={item.code}
              key={index}
            />
          )}
        </div>
        <Button
          onClick={() => console.log("selected", selected)}
        >
          Enviar
        </Button>
      </main>
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
