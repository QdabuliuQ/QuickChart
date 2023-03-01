import { Common } from "../interface";
interface LabelInterface {
  defaultOption: {
    label: {
      [propName: string]: any
    },
  }
  allOption: {
    label: {
      [propName: string]: any
    }
  }
}

let label: Common & LabelInterface = {
  name: '标题样式',
  opName: 'label',
  chartOption: true,
  menuOption: false,
  icon: '',
  defaultOption: {
    label: {
      show: false,
      position: 'center'
    }
  },
  allOption: {
    label: {
      show: false,
      position: 'center'
    }
  }
}