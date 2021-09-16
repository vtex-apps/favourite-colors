import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles';
import ColorButton from '../ColorButton/ColorButton';
import { Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const CSS_HANDLES = [
  'colorPicker--container',
  'colorPicker--text'
]

const ColorPicker: StorefrontFunctionComponent<ColorPickerProps> = ({ colors, onClick }) => {
  const handles = useCssHandles(CSS_HANDLES);
  const [selected, setSelected] = useState('');

  return (
    <section className={`mh8 mv10`}>
      <h2 className={handles['colorPicker--text']}><FormattedMessage id="store/colorPicker.title" /></h2>
      <p className={`${handles['colorPicker--paragraph']}`}><FormattedMessage id="store/colorPicker.subtitle" /></p>

      <div className={`mv8 flex ${handles['ColorPicker--container']}`}>
        {colors && colors.map((item: ColorProps) =>
          <ColorButton
            selected={selected}
            onClick={setSelected}
            code={item.code}
          />
        )}
      </div>

      <Button
        onClick={() => onClick(selected)}
      >
        Enviar
      </Button>

    </section>
  )
}

export default ColorPicker;
