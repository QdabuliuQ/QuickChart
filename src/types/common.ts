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
  }
}