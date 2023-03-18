
interface PieLabelLineInterface {
  show: boolean,
  length: number,
  length2: number,
  smooth: boolean,
  lineStyle: {
    width: number,
    type: string
  }
}

let pie_labelLine: PieLabelLineInterface = {
  show: true,
  length: 10,
  length2: 20,
  smooth: false,
  lineStyle: {
    width: 1,
    type: 'solid'
  }
}

export default pie_labelLine