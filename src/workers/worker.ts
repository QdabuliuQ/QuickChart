addEventListener('message', e => {
  
  const {data, type, handle}: any = e.data
  let fun = eval(`(${handle})`)
  let _data = JSON.parse(data)
  let res = fun(_data)
  return postMessage({
    res,
    type
  })
})
export default {}