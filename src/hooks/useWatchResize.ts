import useProxy from "@/hooks/useProxy";
import {onMounted, onUnmounted} from "vue";

export function useWatchResize(resizeEvent: Function) {
  const proxy = useProxy()
  onMounted(() => {
    proxy.$Bus.on("resize", resizeEvent)
  })
  onUnmounted(() => {
    proxy.$Bus.off("resize", resizeEvent)
  })
}