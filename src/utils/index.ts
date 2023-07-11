import { ConfigInt } from "@/types/common";
import {common} from "@/chartConfig/opname";

export const debounce = (func: Function, time: number = 200, immediate = false) => {
  let timer: number | null = null;
  return (...args: any) => {
    if (timer) clearInterval(timer)
    if (immediate) {
      if (!timer) func.apply(this, args);
      timer = window.setTimeout(() => {
        timer = null
      }, time)
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, args)
      }, time)
    }
  }
}

export const deepCopy = (object: any) => {
  if(!object || typeof object != 'object') return
  // 判断是数组还是对象
  let newObject: any = Array.isArray(object) ? [] : {} 
  // 遍历对象上每一个属性
  for(let key in object) {
    // 必须是对象上的 而不是原型上的
    if(object.hasOwnProperty(key)) {
      // 判断object[key]的类型
      // 如果还是对象类型，则进行递归拷贝
      // 如果是值类型则直接放入
      newObject[key] = typeof object[key] == 'object' ? deepCopy(object[key]) : object[key]
    }
  }
  return newObject
}

export const fileType = (fileName: string) => {  // 判断文件类型
  let suffix = ''; // 后缀获取
  let result: any = ''; // 获取类型结果
  if (fileName) {
    const flieArr = fileName.split('.'); // 根据.分割数组
    suffix = flieArr[flieArr.length - 1]; // 取最后一个
  }
  if (!suffix) return false; // fileName无后缀返回false
  suffix = suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作
  // 匹配图片
  const imgList = ['png', 'jpg', 'jpeg']; // 图片格式
  result = imgList.find(item => item === suffix);
  if (result) return 'image';
}

export const initCopyConfig = (origin: any, data: any, excludeProp?: Set<string>) => {
  for(let key in origin) {
    if(origin.hasOwnProperty(key)) {
      if(excludeProp && excludeProp.has(key)) continue
      if(Array.isArray(origin[key])) {
        data[key] = [...origin[key]]
      } else if(origin[key] && origin[key] instanceof Object) {
        data[key] = new Object()
        initCopyConfig(origin[key], data[key], excludeProp)
      } else {
        data[key] = origin[key]
      }
    }
  }
}

export const getConfigValue = (config: ConfigInt) => {
  let optionsRes: {
    [propName: string]: any
  } = {}
  for(let key in config) {
    if(!config[key].prefixs) {
      if(config[key].unit) optionsRes[key] = config[key].value + config[key].unit
      else optionsRes[key] = config[key].value
    } else {
      let _prop = optionsRes
      for(let prefix of config[key].prefixs as string[]) {
        if(!_prop.hasOwnProperty(prefix)) {
          _prop[prefix] = {}
        }
        _prop = _prop[prefix]
      }
      if(config[key].unit) _prop[key] = config[key].value + config[key].unit
      else _prop[key] = config[key].value
    }
  }
  return optionsRes
}