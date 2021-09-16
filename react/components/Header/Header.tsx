import React from 'react'
import { useCssHandles } from 'vtex.css-handles';
import styles from './Header.module.css';

const CSS_HANDLES = [
  'favorite-color--header',
  'favorite-color--title'
]

const Header: StorefrontFunctionComponent<HeaderProps> = ({ image, title = 'Favorite Color' }) => {
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <header
      style={{ backgroundImage: `url(${image})` }}
      className={`flex items-center ${handles['favorite-color--header']} ${styles.Header}`}
    >
      <h1 className={`ml8 ${handles['favorite-color--title']} ${styles.Title}`}>{title}</h1>
    </header >
  )
}

export default Header;

