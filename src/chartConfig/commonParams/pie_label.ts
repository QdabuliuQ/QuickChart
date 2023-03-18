interface PieLabelInterface {
  show: boolean,
  color: string,
  fontStyle: string,
  fontWeight: string,
  fontFamily: string,
  fontSize: number,
  textShadowColor: string,
  position: string,
}

let pie_label: PieLabelInterface = {
  show: true,
  color: '#000',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontSize: 12,
  textShadowColor: 'transparent',
  position: 'outside',
}

export default pie_label