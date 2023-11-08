
export function setCommonStyle(baseInfo: any, info: any) {
  info.value!.style['width'] = baseInfo.style['width']
  info.value!.style['height'] = baseInfo.style['height']
  info.value!.style['translateX'] = baseInfo.style['translateX']
  info.value!.style['translateY'] = baseInfo.style['translateY']
  info.value!.style['rotate'] = baseInfo.style['rotate']
}