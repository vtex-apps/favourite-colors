import React from 'react'

import { useCssHandles } from 'vtex.css-handles';

import styles from './ColorButton.module.css';

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
      className={`${selected === code && `${styles.active} ${handles['colorPicker--colorActive']}`} ${handles['colorPicker--color']} ${styles.Color}`}
      onClick={() => onClick(code)}
    >
    </button>
  )
}

export default ColorButton;
