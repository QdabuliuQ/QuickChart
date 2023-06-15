// const initRows = (rows: any) => {
//   let res: any = {}
//   outer: for(let key in rows) {
//     if(key == 'len') continue
//     res[key] = {
//       cells: {}
//     }
//     for(let item in rows[key].cells) {
//       if(JSON.stringify(rows[key].cells[item]) == '{}') {
//         break outer
//       }
//       res[key].cells[item] = {
//         text: rows[key].cells[item].text
//       }
//     }
//     if(JSON.stringify(rows[key].cells) == '{}') break
//   }
//   return res
// }

const initRows = (rows: any) => {
  console.log(rows, '-==--');
  
  let res: any = {}
  let length: number = Object.keys(rows).length-1
  for(let i = 0; i < length; i ++) {
    if(!rows[i]) continue
    let emptyIdx = 0
    res[i] = {
      cells: {}
    }
    let rowLength: number = Object.keys(rows[i].cells).length
    for(let j = rowLength-1; j >= 0; j --) {
      if(JSON.stringify(rows[i].cells[j]) !== '{}' || Object.keys(res[i].cells).length) {
        res[i].cells[j] = {
          text: rows[i].cells[j].text ? rows[i].cells[j].text : ''
        }
      } else {
        emptyIdx ++
      }
    }
    if(emptyIdx == rowLength && i == length-1) {
      delete res[i]
    }
  }
  return res
}



addEventListener('message', e => {
  const {data, type, handle}: any = e.data
  let fun = eval(`(${handle})`)
  let _data = JSON.parse(data)
  // initRows(_data)
  let r = initRows(_data)
  console.log(r);
  
  let res = fun(r)
  return postMessage({
    res,
    type
  })
})
export default {}