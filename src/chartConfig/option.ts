// import { IntPointSeriesLabel } from "./interface"

export const point_series_itemStyle = (option?: any) => {
  let res: any = {
    borderColor: '#000',
    borderWidth: 0,
    borderType: 'solid',
    shadowBlur: 0 ,
    shadowColor: '' ,
    shadowOffsetX: 0 ,
    shadowOffsetY: 0 ,
  }
  for(let key in option) {
    if(res.hasOwnProperty(key)) {
      res[key] = option[key]
    }
  }
  return res
}

export const point_series_label = (option?: any) => {
  let res: any = {
    show: false,
    fontStyle: 'normal' ,
    fontWeight: 'normal' ,
    fontFamily: 'sans-serif' ,
    fontSize: 12,
    color: '#fff',
    offset: [0, 0],
    align: '',
    textBorderColor: '#000',
    textBorderWidth: 0,
    textBorderType: 'solid'
  }
  for(let key in option) {
    if(res.hasOwnProperty(key)) {
      res[key] = option[key] as any
    }
  }
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
  for(let key in option) {
    if(key.indexOf('.') == -1) {
      if(res.hasOwnProperty(key)) {
        res[key] = option[key] as any
      }
    } else {
      let keys = key.split('.')
      let data = res
      for(let i = 0; i < keys.length-1; i ++) {
        data = data[keys[i]]
      }
      data[keys[keys.length-1]] = option[key]
    }
  }
  return res
}