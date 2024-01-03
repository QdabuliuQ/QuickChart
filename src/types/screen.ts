import {BorderType} from "@/types/element";

export type Elements = "chart"|"map"|"text"|"shape"|"image"|"scrollText"
export interface IStyle {
  width: number;
  height: number;
  translateX: number;
  translateY: number;
  rotate: number;
  zIndex: number;
  display: "none" | "block"
}
export type Image = {
  id: string
  type: 'image',
  isLock: boolean
  url: string
  file: any
  style: {
    borderWidth: number
    borderType: BorderType
    borderColor: string
    shadowX: number
    shadowY: number
    shadowBlur: number
    shadowColor: string
  } & IStyle
}
export type Shape = {
  id: string
  type: 'shape',
  isLock: boolean
  path: string
  viewBox: [number, number]
  style: {
    fill: string
    stroke: string
    strokeWidth: number
    shadowColor: string
    shadowX: number
    shadowY: number
    shadowBlur: number
  } & IStyle
}
export type Chart = {
  id: string
  type: 'chart'
  isLock: boolean
  cover: string
  option: string
  style: IStyle
}
export type Map = {
  id: string
  type: 'map'
  isLock: boolean
  cover: string
  option: string
  style: IStyle
  adcode: string
}
export type ScrollText = {
  id: string
  type: 'scrollText',
  isLock: boolean
  content: string
  style: {
    fontSize: number;
    fontWeight: string;
    color: string;
    textAlign: "left" | "right" | "center";
    letterSpacing: number
    fontStyle: "normal" | "italic"
    lineHeight: number
    textDecorationLine: "none"|"underline"|"overline"|"line-through"
    textDecorationColor: string
    textDecorationStyle: "solid"|"double"|"dotted"|"dashed"|"wavy"
    backgroundColor: string
  } & IStyle
}

export type Text = {
  id: string
  type: 'text'
  isLock: boolean
  content: string
  style: {
    fontSize: number;
    fontWeight: string;
    color: string;
    textAlign: "left" | "right" | "center";
    letterSpacing: number
    fontStyle: "normal" | "italic"
    lineHeight: number
    textDecorationLine: "none"|"underline"|"overline"|"line-through"
    textDecorationColor: string
    textDecorationStyle: "solid"|"double"|"dotted"|"dashed"|"wavy"
    backgroundColor: string
  } & IStyle
}
export type BgType = "color" | "image"
export type ElementType = Chart | Map | Text | Shape | Image | ScrollText
export type ElementTypeProperties<T extends ElementType['type']> = T extends 'chart' ? Chart : T extends 'map' ? Map : T extends 'text' ? Text : T extends 'shape' ? Shape : T extends 'image' ? Image : T extends 'scrollText' ? ScrollText : never
export interface IConfig {
  canvas: {
    bgType: BgType;
    bgImage: string
    file: any
    bgColor: string;
    fontSize: number
    color: string
    fontWeight: string
    backgroundSize: "cover" | "contain"
    backgroundRepeat: "no-repeat" | "repeat"
  };
  elements: Array<ElementTypeProperties<Elements>>;
}