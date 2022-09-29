
export default [
  {
    name: '标题',
    opName: 'title',
    defaultOption: {
      title: {
        text: '图表标题',
        show: true,
        textAlign: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        textStyle: {
          color: '#333',
          fontWeight: 'bolder',
          fontSize: 18,
        }
      },
    },
    allOption: {
      title: {
        text: '',
        show: [true, false],
        textAlign: ['auto','left','right','center'],
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '',
        textStyle: {
          color: '',
          fontWeight: '',
          fontSize: 18,
        }
      },
    }
  }
]