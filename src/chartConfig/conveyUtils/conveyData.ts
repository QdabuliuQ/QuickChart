type Direction = 'col' | 'row'
interface IntData {
  direction: Direction
  data: Array<any>
  startRow?: number
  startCol?: number
}

let obj: IntData = {
  direction: 'col',
  data: []
}

export const conveyToExcel = (rules: IntData[]) => {
  const excelData: any = {}
  for(let {direction, data, startRow, startCol} of rules) {
    if (direction == 'row') {
      excelData[startRow as number] = {
        cells: {}
      }
      for(let i = 0; i < data.length; i ++) {
        excelData[startRow as number].cells[i] = {
          text: data[i]
        }
      }
    } else {
      // 嵌套数组 / 对象
      if (data.length && typeof data[0] == 'object') {
        let rIdx: number = startRow ? startRow : 0

        console.log('----');
        if(Array.isArray(data[0])) {
          for(let i = 0; i < data.length; i ++) {
            for(let j = 0; j < data[i].length; j ++) {
              if (!excelData[rIdx]) {
                excelData[rIdx] = {
                  cells: {}
                }
              }
              excelData[rIdx].cells[j] = {
                text: data[i][j].toString()
              }
            }
            rIdx ++
          }
        } else {
          for(let i = 0; i < data.length; i ++) {
            let j: number = 0
            for(let key in data[i]) {
              if (!excelData[rIdx]) {
                excelData[rIdx] = {
                  cells: {}
                }
              }
              excelData[rIdx].cells[j] = {
                text: data[i][key].toString()
              }
              j ++
            }
            rIdx ++
          }
        }
      } else if(data.length) {
        let rIdx: number = startRow ? startRow : 0
        let cIdx: number = startCol as number
        for (let i = 0; i < data.length; i++) {
          if (!excelData[rIdx]) {
            excelData[rIdx] = {
              cells: {}
            }
          }
          excelData[rIdx].cells[cIdx] = {
            text: data[i].toString()
          }
          rIdx ++
        }
      }
    }
  }
  return excelData
}