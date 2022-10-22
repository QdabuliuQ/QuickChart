// 异步导入组件
const asynImport = (t: number, callback = () => {}) => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      callback()
      resolve()
    }, t)
  })
}

export default asynImport