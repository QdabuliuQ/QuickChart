import useScreenStore from "./screen"
import useChartStore from "@/store/chart";
export default function useStore() {
  return {
    screen: useScreenStore(),
    chart: useChartStore()
  }
}