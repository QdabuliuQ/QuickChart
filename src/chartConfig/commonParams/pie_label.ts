interface PieLabelInterface {
  show: boolean,
  color: string,
  fontStyle: string,
  fontWeight: string,
  fontFamily: string,
  fontSize: number,
  position: string,
}

let pie_label: PieLabelInterface = {
  show: true,
  color: '#000',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontSize: 12,
  position: 'outside',
}

export default pie_label