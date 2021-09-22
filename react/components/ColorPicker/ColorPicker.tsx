import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'

import { Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles';
import { Spinner, Alert } from 'vtex.styleguide';


import updateColorGQL from './../../graphql/updateColor.gql';
import ColorButton from '../ColorButton/ColorButton';

const CSS_HANDLES = [
  'colorPicker--container',
  'colorPicker--title',
]


const ColorPicker = ({ setSubmitted, colorsArray }: any) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [selected, setSelected] = useState('');

  const [updateColor,
    {
      loading,
      error,
      data
    }] = useMutation(updateColorGQL)

  const [state, setState] = useState({
    loading: false, error: ""
  })

  useEffect(() => {
    if (loading) setState(prevState => ({ ...prevState, loading: true }))
    if (error) setState(prevState => ({ ...prevState, error: "Ocurrió un error, inténtelo nuevamente" }))
    if (data) {
      console.log(data)
      data.updateColor?.status === 204 && setSubmitted(true)
    }
  }, [data, loading, error])

  return (
    <>
      {!state.loading ?
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
            onClick={() => updateColor({ variables: { colorId: selected } })}
          >
            Enviar
          </Button>
        </main>
        :
        <div className='flex items-center justify-center h5'>
          <Spinner />
        </div>
      }
      {state.error &&
        <Alert type="error"> {state.error} </Alert>
      }
    </>
  )
}

export default ColorPicker
