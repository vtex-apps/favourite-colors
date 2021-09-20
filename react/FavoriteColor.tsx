import React, { useState, useEffect } from 'react';
import BarChart from './components/BarChart/BarChart';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Header from './components/Header/Header';
import updateColorGQL from './graphql/updateColor.gql';
import { useMutation } from 'react-apollo'

const FavoriteColor: StorefrontFunctionComponent<FavoriteColorProps> = ({
  image,
  title = 'Color Favorito',
  colorsFromAdmin
}) => {
  const [state, setState] = useState({
    isLoading: true,
    error: ""
  })
  const [submited, setSubmited] = useState(false);

  const [updateColor,
    {
      loading,
      error,
      data
    }] = useMutation(updateColorGQL)

  const sendCode = (selected: string) => {
    updateColor({ variables: { colorId: selected } })
  }

  useEffect(() => {
    if (loading) setState(prevState => ({ ...prevState, isLoading: true }))
    if (error) setState(prevState => ({ ...prevState, error: error }))
    if (data) {
      setSubmited(true)
    }
  }, [error, data, loading])


  return (
    <>
      <Header image={image} title={title} />
      {
        !submited ?
          <>
            <ColorPicker onClick={sendCode} colors={colorsFromAdmin} />
            {state.error && <p>{state.error}</p>}
          </>
          :
          <BarChart />
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
    colorsFromAdmin: {
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
