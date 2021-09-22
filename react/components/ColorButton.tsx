import React from 'react'

import { useCssHandles } from 'vtex.css-handles';

const CSS_HANDLES = [
  'colorPicker--color',
  'colorPicker--colorActive'
]

const ColorButton: StorefrontFunctionComponent<ColorButtonProps> = ({ selected, code, onClick }) => {
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <button
      name={code}
      style={{ backgroundColor: code }}
      className={`pointer b--transparent br-pill w3 h3 mr5 ${selected === code && `grow ${handles['colorPicker--colorActive']}`} ${handles['colorPicker--color']}`}
      onClick={() => onClick(code)}
    >
    </button>
  )
}

export default ColorButton;
