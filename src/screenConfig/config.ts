import {IConfig} from "@/types/common";

let config: IConfig = {
  canvas: {
    bgType: "color",
    bgColor: "#fff",
    bgImage: "",
    fontSize: 14,
    color: '#000',
    fontWeight: 'normal',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  elements: [
    {
      type: "chart",
      cover: 'http://127.0.0.1:3031/chartCover/type9/VY4RV4HY39MNEQUXHRIB.octet-stream',
      option: "",
      isLock: false,
      style: {
        width: 200,
        height: 130,
        translateX: 0,
        translateY: 0,
        rotate: 0,
        zIndex: 1,
      },
    },
    {
      type: "text",
      content: "ahjhh",
      isLock: false,
      style: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#000',
        width: 200,
        height: 130,
        translateX: 100,
        translateY: 100,
        rotate: 0,
        zIndex: 1,
        textAlign: "center",
        letterSpacing: 0,
        fontStyle: "normal",
        lineHeight: 16,
        textDecorationLine: "none",
        textDecorationColor: "#000",
        textDecorationStyle: "solid",
        backgroundColor: 'rgba(0,0,0,0)'
      },
    }
  ],
};

export default config;
