import React from 'react'

import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'header--container',
  'header--title'
]

const Header = ({ image, title }: HeaderProps) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <header
      style={{ backgroundImage: `url(${image})` }}
      className={`flex items-center ${handles['header--container']}`}
    >
      <h1 className={`ml8 white t-heading-1 b ${handles['header--title']}`}>{title}</h1>
    </header>
  )
}

export default Header
