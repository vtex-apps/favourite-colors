import React from 'react'
import styles from './Header.module.css';
import { useCssHandles } from 'vtex.css-handles';

const CSS_HANDLES = [
  'header--container',
  'header--title'
]

const Header: StorefrontFunctionComponent<HeaderProps> = ({ image, title }) => {
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <header
      style={{ backgroundImage: `url(${image})` }}
      className={`flex items-center ${styles.Header} ${handles['header--container']}`}>
      <h1 className={`ml8 ${styles.Title} ${handles['header--title']}`}>{title}</h1>
    </header>
  )
}


export default Header
