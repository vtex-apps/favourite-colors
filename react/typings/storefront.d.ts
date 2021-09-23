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

  interface FavouriteColorsProps {
    image: string
    title: string
    colors?: any
  }
  interface HeaderProps {
    image: string
    title: string
  }

  interface ColorProps {
    code: string
    selected?: string
    onClick: (code: string) => void
  }
  interface ColorPickerProps {
    colors: ColorProps[]
    onClick?: (selected: string) => void
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  }
  interface ColorsMetaData {
    color: string,
    votes: number
  }
}
