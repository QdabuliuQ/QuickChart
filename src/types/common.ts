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