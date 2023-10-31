import {IConfig} from "@/types/common";

let config: IConfig = {
  canvas: {
    bgType: "color",
    background: "#fff",
    fontSize: 14,
    color: '#000'
  },
  elements: [
    {
      type: "chart",
      cover: 'http://127.0.0.1:3031/chartCover/type9/VY4RV4HY39MNEQUXHRIB.octet-stream',
      option: "",
      style: {
        width: 200,
        height: 130,
        translateX: 0,
        translateY: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
      },
    },
    {
      type: "chart",
      cover: 'http://127.0.0.1:3031/chartCover/type2/3SXRWEO3SMYOMGB1Q1N0.octet-stream',
      option: "",
      style: {
        width: 200,
        height: 130,
        translateX: 0,
        translateY: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
      },
    },
  ],
};

export default config;
