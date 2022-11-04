export class InitData {
  animate: boolean = false
  imgWidth: number = 0
  coverHeight: number = 0
  processList: {
    step: number
    title: string
    desc: string
    img: any
  }[] = [
    {
      step: 1,
      title: '选择图表',
      desc: '在左侧的图表列表提供了若干钟图表类型，您可以根据实际需求选择合适的图表进行配置',
      img: require('@/assets/image/process_category.png'),
    },
    {
      step: 2,
      title: '配置数据',
      desc: '可以在右侧的图表配置中找到数据编辑，按照规范编辑/导入EXCEL表格模板格式，EXCEL表格上方也提供了导入导出功能',
      img: require('@/assets/image/process_detail.png'),
    },
    {
      step: 3,
      title: '配置图表',
      desc: '每一个图表都提供了不同的图表样式配置，根据实际需求对图表的各个部分的样式进行调整',
      img: require('@/assets/image/process_data.png'),
    },
    {
      step: 4,
      title: '导出数据/下载图表',
      desc: '当进行图表的配置完成后，可以在右侧的参数面板下载图表的PNG格式，和下载图表数据的EXCEL文件',
      img: require('@/assets/image/process_result.png'),
    },
  ]
  functionList: {
    title: string
    desc: string
    img: any
  }[] = [
    {
      title: '丰富的图表类型',
      desc: '提供了线性图，柱状图，饼状图，地图等多种类型',
      img: require('@/assets/image/category.png')
    },
    {
      title: '强大的细节配置',
      desc: '将图表的不同配置进行划分，根据需求选择指定配置',
      img: require('@/assets/image/detail.png')
    },
    {
      title: '数据的导入导出',
      desc: '支持通过导入EXCEL文件批量生成数据，和导出EXCEL文件',
      img: require('@/assets/image/data.png')
    },
    {
      title: '免登录即可使用',
      desc: '无需登录账号即可快速体验！因为作者也不会写接口',
      img: require('@/assets/image/noLogin.png')
    },
  ]
}