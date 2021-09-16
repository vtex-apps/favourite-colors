import { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = GenericObject>
    extends FunctionComponent<P> {
    getSchema?(props: P): GenericObject
    schema?: GenericObject
  }

  interface StorefrontComponent<P = GenericObject, S = GenericObject>
    extends Component<P, S> {
    getSchema?(props: P): GenericObject
    schema: GenericObject
  }
  export interface FavoriteColorProps {
    isActive: boolean
    image: string
    title: string
    text: string
    colors: any
  }

  export interface HeaderProps {
    image: string
    title: string
  }
  export interface ColorPickerProps {
    // text: string
    colors: ColorProps[],
    onClick: (selected: string) => void
  }

  export interface ColorProps {
    code: string
    selected: string
    onClick: (code: string) => void
  }

  export interface Color{
    code: string
  }
  export interface BarChartProps {
    data: ColorsMetaData[]
  }

  export interface ColorsMetaData {
    color: string,
    votes: number
  }
}
