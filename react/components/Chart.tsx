import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo'

import { useCssHandles } from 'vtex.css-handles'

import { Spinner, Alert } from 'vtex.styleguide'

import getAllColors from './../graphql/getAllColors.gql'


const CSS_HANDLES = [
  'chart--container',
  'chart--item'
]

const Chart = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const [colors, setColors] = useState<ColorsMetaData[]>()

  const [state, setState] = useState({
    loading: false, error: ""
  })

  const { loading, error, data } = useQuery(getAllColors, {
    ssr: false,
  })

  useEffect(() => {
    if (loading) setState(prevState => ({ ...prevState, loading: true }))
    if (error) setState(prevState => ({ ...prevState, error: "Ocurrió un error, inténtelo nuevamente." }))
    if (data) setColors(data.getAllColors?.colors)
  }, [loading, error, data])


  return (
    <>
      <ul className={`ma8 pa0 ${handles['chart--container']}`}>
        {colors && colors.map((color: ColorsMetaData, index: number) =>
          <li
            key={index}
            className={`grow b--transparent pa5 mv5 br-pill list flex flex-column justify-center items-center ${handles['chart--item']}`}
            style={{ backgroundColor: color.color }}
          >
            {color.color} <span className={'b t-heading-3'}> {color.votes}</span>
          </li>
        )}
      </ul>
      {state.loading &&
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

export default Chart
