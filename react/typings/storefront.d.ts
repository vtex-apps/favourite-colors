import { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    getSchema?(props: P): object
    schema?: object
  }

  interface StorefrontComponent<P = {}, S = {}> extends Component<P, S> {
    getSchema?(props: P): object
    schema: object
  }

  interface FavouriteColorProps {
    image: string
    title: string
    colorsArray: any
  }

  interface HeaderProps {
    image: string
    title: string
  }

  interface ColorProps {
    code: string
    selected: string
    onClick: (code: string) => void
  }

  interface ColorPickerProps {
    colors: ColorProps[],
    onClick: (selected: string) => void
  }

  interface ColorButtonProps {
    code: string
    selected: string
    onClick: (code: string) => void
  }
}
