export class InitData {
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
}