import React from 'react'

import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'colorButton--container',
  'colorButton--colorActive',
]

const ColorButton = ({ code, onClick, selected }: ColorProps) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <button
      style={{ backgroundColor: code }}
      className={`pointer b--transparent br-pill w3 h3 mr5 ${handles['colorButton--container']} ${selected === code && `${handles['colorButton--colorActive']}`}`}
      onClick={() => onClick(code)}
    >
    </button>
  )
}

export default ColorButton
