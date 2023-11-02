import { ListInt } from "@/chartConfig/constant"

type optionType = null | 'imgload' | 'select' | 'input_number' | 'input_text' | 'color_picker' | 'switch'
export interface ConfigInt {
  [propName: string]: {
    type: optionType
    value?: any
    title?: string
    options?: ListInt[]
    max?: number
    min?: number
    step?: number
    attr?: string
    prefixs?: string[]
    unit?: string
    pre?: string
    suf?: string
    imgType?: string
    imgSize?: number
  }
}

export interface CommentInt {
  comment_id: string
  event_id: string
  content: string
  user_id: string
  user_pic: string
  nickname: string
  time: number
  self: number
  is_praise?: string|number
  praise_count?: number
}

export interface EventInt {
  chart_id: string
  content: string
  cover: string
  event_id: string
  name: string
  nickname: string
  state: string
  time: number
  user_id: string
  user_pic: string
  is_praise: number
  praise_count: number
  comment_count: number
  au_nickname: string
  au_user_pic: string
  au_user_id: string
  type: string
  comments: CommentInt[]
}

export interface ResponseInt {
  msg: string
  status: number
  data?: any
  [props: string]: any
}

export type Elements = "chart"|"map"|"text"
export interface IStyle {
  width: number;
  height: number;
  translateX: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
  rotate: number;
  zIndex: number
}
export type Chart = {
  type: 'chart'
  isLock: boolean
  cover: string
  option: string
  style: IStyle
}
export type Map = {
  type: 'map'
  isLock: boolean
  cover: string
  option: string
  style: IStyle
}
export type Text = {
  type: 'text'
  isLock: boolean
  content: string
  style: {
    fontSize: number;
    fontWeight: string;
    color: string;
  } & IStyle
}
export type BgType = "color" | "image"
export type ElementType = Chart | Map | Text
export type ElementTypeProperties<T extends ElementType['type']> = T extends 'chart' ? Chart : T extends 'map' ? Map : T extends 'text' ? Text : never
export interface IConfig {
  canvas: {
    bgType: BgType;
    bgImage: string
    bgColor: string;
    fontSize: number
    color: string
    fontWeight: string
  };
  elements: Array<ElementTypeProperties<Elements>>;
}