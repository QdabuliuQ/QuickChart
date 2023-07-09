export const replaceOptionValue = (origin: any, option: any) => {
  for (let key in option) {
    if (key.indexOf('.') == -1) {
      if (Number.isNaN(option[key])) {
        delete origin[key]
      } else {
        origin[key] = option[key] as any
      }
    } else {
      let keys = key.split('.')
      let data = origin
      for (let i = 0; i < keys.length - 1; i++) {
        data = data[keys[i]]
      }
      if (!option[key]) delete data[keys[keys.length - 1]]
      else data[keys[keys.length - 1]] = option[key]
    }
  }
}

export const point_series_itemStyle = (option?: any) => {
  let res: any = {
    borderColor: '#000',
    borderWidth: 0,
    borderType: 'solid',
    shadowBlur: 0,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
  }
  replaceOptionValue(res, option)
  return res
}

export const point_series_label = (option?: any) => {
  let res: any = {
    show: false,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    color: '#fff',
    offset: [0, 0],
    align: 'center',
  }
  replaceOptionValue(res, option)
  return res
}

export const point_series_labelLine = (option?: any) => {
  let res: any = {
    show: false,
    length: 0,
    length2: 0,
    lineStyle: {
      color: '#000',
      type: 'solid',
      width: 1,
    }
  }
  replaceOptionValue(res, option)
  return res
}

export const bar_angleAxis_axis = (option?: any) => {
  const axisLine = {
    show: true,
    lineStyle: {
      color: '',
      width: 1,
      type: 'solid',
      opacity: 1,
    }
  }
  replaceOptionValue(axisLine, option)
  return axisLine
}

export const bar_series_backgroundStyle = (option?: any) => {
  let res: any = {
    color: '',
    borderColor: '',
    borderWidth: 0,
    borderType: 'solid',
    borderRadius: 0,
    shadowBlur: 0,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 1,
  }
  replaceOptionValue(res, option)
  return res
}

export const bar_series_label = (option?: any) => {
  let res: any = {
    show: true,
    rotate: 0,
    color: '#fff',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    borderColor: '',
    borderWidth: 0,
    borderType: 'solid',
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    position: 'inside',
    formatter: '{b}'
  }
  replaceOptionValue(res, option)
  return res
}

export const line_series = (option?: any) => {
  let res: any = {
    showSymbol: true,
    symbol: 'circle',
    symbolSize: 5,
    symbolRotate: 0,
    smooth: false,
    stack: false,
    lineStyle: {
      width: 2,
      type: 'solid',
      shadowBlur: 0,
      shadowColor: null,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    }
  }
  replaceOptionValue(res, option)
  return res
}

export const line_series_label = (option?: any) => {
  let res: any = {
    show: false,
    position: 'top',
    rotate: 0,
    offsetX: 0,
    offsetY: 0,
    color: '#000',
    offset: [0, 0],
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    backgroundColor: null,
    borderWidth: 0,
    borderColor: null,
    borderType: 'solid',
    shadowColor: null,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textBorderColor: null,
    textBorderWidth: 0,
    textBorderType: 'solid',
    textShadowColor: null,
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0,
  }
  replaceOptionValue(res, option)
  return res
}

export const kline_series_itemstyle = (option?: any) => {
  let res: any = {
    color: '#eb5455',
    color0: '#48b263',
    borderColor: '',
    borderColor0: '',
    borderWidth: 1,
    shadowBlur: 0,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 1,
  }
  replaceOptionValue(res, option)
  return res
}

export const sankey_series = (option?: any) => {
  let res: any = {
    left: '5%',
    top: '5%',
    right: '20%',
    bottom: '5%',
    nodeWidth: 20,
    nodeGap: 8,
    nodeAlign: 'justify',
    orient: 'horizontal',
  }
  replaceOptionValue(res, option)
  return res
}

export const sankey_series_label = (option?: any) => {
  let res: any = {
    show: true,
    position: 'right',
    rotate: 0,
    offset: [0, 0],
    color: '#000',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
  }
  replaceOptionValue(res, option)
  return res
}

export const sankey_series_itemStyle = (option?: any) => {
  let res: any = {
    borderWidth: 0,
    borderType: 'solid',
    borderColor: '#000',
    shadowBlur: 0,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 1,
  }
  replaceOptionValue(res, option)
  return res
}

export const sankey_series_lineStyle = (option?: any) => {
  let res: any = {
    color: '#314656' ,
    opacity: 0.2 ,
    curveness: 0.5 ,
    shadowBlur: 0 ,
    shadowColor: '' ,
    shadowOffsetX: 0 ,
    shadowOffsetY: 0 ,
  }
  replaceOptionValue(res, option)
  return res
}