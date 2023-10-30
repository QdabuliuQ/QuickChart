interface IStyle {
  width: string;
  height: string;
  translateX: string;
  translateY: string;
  scaleX: string;
  scaleY: string;
  rotate: string;
}
type Chart = {
  type: 'chart'
  cover: string
  option: string
  style: IStyle
}
type Map = {
  type: 'map'
  cover: string
  option: string
  style: IStyle
}
type Text = {
  type: 'text'
  content: string
  style: {
    fontSize: string;
    fontWeight: string;
    color: string;
  } & IStyle
}
type BgType = "color" | "image"
type ElementType = Chart | Map | Text
type ElementTypeProperties<T extends ElementType['type']> = T extends 'chart' ? Chart : T extends 'map' ? Map : T extends 'text' ? Text : never 
interface IConfig {
  canvas: {
    bgType: BgType;
    background: string;
    fontSize: string
    color: string
  };
  elements: Array<ElementTypeProperties<"chart"|"map"|"text">>;
}

let config: IConfig = {
  canvas: {
    bgType: "color",
    background: "#fff",
    fontSize: '14px',
    color: '#000'
  },
  elements: [
    {
      type: "chart",
      cover: 'http://127.0.0.1:3031/chartCover/type9/VY4RV4HY39MNEQUXHRIB.octet-stream',
      option: "",
      style: {
        width: "200px",
        height: "130px",
        translateX: "0px",
        translateY: "0px",
        scaleX: "1",
        scaleY: "1",
        rotate: "0deg",
      },
    },
    {
      type: "chart",
      cover: 'http://127.0.0.1:3031/chartCover/type2/3SXRWEO3SMYOMGB1Q1N0.octet-stream',
      option: "",
      style: {
        width: "200px",
        height: "130px",
        translateX: "100px",
        translateY: "100px",
        scaleX: "1",
        scaleY: "1",
        rotate: "0deg",
      },
    },
  ],
};

export default config;
