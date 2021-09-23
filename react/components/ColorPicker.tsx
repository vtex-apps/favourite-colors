import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'

import { useCssHandles } from 'vtex.css-handles'
import { Button, Spinner, Alert } from 'vtex.styleguide'

import ColorButton from './ColorButton'
import updateColorGQL from './../graphql/updateColor.gql'

const CSS_HANDLES = [
  'colorPicker--container',
  'colorPicker--title',
  'colorPicker--subtitle'
]

const ColorPicker = ({ colors, setSubmitted }: ColorPickerProps) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [selected, setSelected] = useState('')
  const [updateColor, { loading, error, data }] = useMutation(updateColorGQL)

  const [state, setState] = useState({
    loading: false, error: ""
  })

  useEffect(() => {
    if (loading) setState(prevState => ({ ...prevState, loading: true }))
    if (error) setState(prevState => ({ ...prevState, error: "Ocurrió un error, inténtelo nuevamente." }))
    if (data) data.updateColor?.status === 204 && setSubmitted(true)
  }, [loading, error, data])

  return (
    <>
      {
        !state.loading ? <section className={`${handles['colorPicker--container']} ma10`}>
          <h2 className={`${handles['colorPicker--title']} mt8 mb3 t-heading-2 fw2`}>Elegí tu color favorito</h2>
          <p className={`mb8 fw2 ${handles['colorPicker--subtitle']}`}>Elegí tu color favorito y hace click para conocer los resultados</p>
          <div className={`mv8 flex`}>
            {colors.map((item: ColorProps, index: number) =>
              <ColorButton
                code={item.code}
                key={index}
                onClick={setSelected}
                selected={selected}
              />
            )}
          </div>
          <Button onClick={() => updateColor({ variables: { colorId: selected } })}>
            Enviar
          </Button>

        </section>
          :
          <div className='flex items-center justify-center h5'>
            <Spinner />
          </div>
      }
      {state.error &&
        <Alert type="error"> {state.error} </Alert>}
    </>
  )
}

export default ColorPicker
