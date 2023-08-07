const EMPTY: string = 'EMPTY'

export const replaceOptionValue = (origin: any, option: any): void => {
  if(!origin || !option) return
  for (let key in option) {
    if (key.indexOf('.') == -1) {
      if (option[key] === EMPTY) {
        delete origin[key]
      }
      else if (origin.hasOwnProperty(key)) {
        origin[key] = option[key] as any
      }
    } else {
      let keys = key.split('.');
      let data = origin
      for (let i = 0; i < keys.length - 1; i++) {
        data = data[keys[i]]
      }

      if(option[key] === EMPTY) delete data[keys[keys.length - 1]]
      else data[keys[keys.length - 1]] = option[key]
    }
  }
}