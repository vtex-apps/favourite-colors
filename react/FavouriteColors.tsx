import React from 'react'
import Header from './components/Header/Header';

const FavouriteColor: StorefrontFunctionComponent<FavouriteColorProps> = ({
  image,
  title = "Color Favorito"
}) => {
  return (
    <>
      <Header image={image} title={title} />
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
    }
  }
}
