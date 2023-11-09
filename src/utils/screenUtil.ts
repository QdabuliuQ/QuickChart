
export function setCommonStyle(baseInfo: any, info: any) {
  info.value!.style['width'] = baseInfo.value.style['width']
  info.value!.style['height'] = baseInfo.value.style['height']
  info.value!.style['translateX'] = baseInfo.value.style['translateX']
  info.value!.style['translateY'] = baseInfo.value.style['translateY']
  info.value!.style['rotate'] = baseInfo.value.style['rotate']
}