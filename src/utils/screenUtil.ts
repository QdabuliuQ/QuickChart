import {Elements, ElementTypeProperties} from "@/types/screen";
import useStore from "@/store";
import {uuid} from "@/utils/index";

const {screen} = useStore()
export function setCommonStyle(baseInfo: any, info: any) {
  info.value!.style['width'] = baseInfo.value.style['width']
  info.value!.style['height'] = baseInfo.value.style['height']
  info.value!.style['translateX'] = baseInfo.value.style['translateX']
  info.value!.style['translateY'] = baseInfo.value.style['translateY']
  info.value!.style['rotate'] = baseInfo.value.style['rotate']
}

function resetConfig<T extends Elements>(originConfig: ElementTypeProperties<T>, newConfig: ElementTypeProperties<T>) {
  const reset = (o: any, n: any) => {
    for(let key in n) {
      if(originConfig.hasOwnProperty(key)) {
        if(n[key] && typeof n[key] === 'object') {
          resetConfig(o[key], n[key])
        } else {
          o[key] = n[key]
        }
      }
    }
  }
  reset(originConfig, newConfig)
}
export function getTextConfig(config?: ElementTypeProperties<"text">) {
  let originConfig: ElementTypeProperties<'text'> = {
    id: uuid(6, 36),
    type: "text",
    content: "插入文本内容",
    isLock: false,
    style: {
      display: "block",
      fontSize: 14,
      fontWeight: 'normal',
      color: '#000',
      width: 200,
      height: 50,
      translateX: 0,
      translateY: 0,
      rotate: 0,
      zIndex: 1,
      textAlign: "center",
      letterSpacing: 0,
      fontStyle: "normal",
      lineHeight: 16,
      textDecorationLine: "none",
      textDecorationColor: "#000",
      textDecorationStyle: "solid",
      backgroundColor: 'rgba(0,0,0,0)'
    },
  }
  if (config) {
    resetConfig(originConfig, config)
  }
  return originConfig
}

export const getShapeConfig = (config?: ElementTypeProperties<"shape">) => {
  let originConfig: ElementTypeProperties<'shape'> = {
    id: uuid(6, 36),
    type: "shape",
    isLock: false,
    viewBox: [200, 200],
    path: '',
    style: {
      display: "block",
      fill: "#f8b557",
      stroke: "rgba(0,0,0,0)",
      strokeWidth: 0,
      shadowColor: "rgba(0,0,0,0)",
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 5,
      width: 50,
      height: 50,
      translateX: 0,
      translateY: 0,
      rotate: 0,
      zIndex: 1,
    }
  }
  if (config) {
    resetConfig(originConfig, config)
  }
  return originConfig
}
export function getImageConfig(config?: any) {
  let originConfig: ElementTypeProperties<'image'> = {
    id: uuid(6, 36),
    type: "image",
    isLock: false,
    url: '',
    file: '',
    style: {
      display: "block",
      width: 200,
      height: 130,
      translateX: 200,
      translateY: 200,
      rotate: 0,
      zIndex: 1,
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: 0,
      borderType: 'none',
      shadowColor: "rgba(0,0,0,0)",
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0,
    }
  }
  if (config) {
    resetConfig(originConfig, config)
  }
  return originConfig
}

export function cutElement(i: number) {
  screen.setTmpElement(screen.deleteScreenOptionOfElements(i)[0])
}
export function lockElement(i: number) {
  screen.updateElementOfItem(i, 'isLock', true)
  screen.updateCurElementIdx(-1)
}
export function unlockElement(i: number) {
  screen.updateElementOfItem(i, 'isLock', false)
}
export function getOffset(val1: number, val2: number, val3: number) {
  return (val1 * val3 / val2).toFixed(2)
}