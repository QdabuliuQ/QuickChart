import {onUnmounted, watch} from "vue";
import {debounce} from "@/utils";
import useProxy from "@/hooks/useProxy";
export default function (data: any, propName: string, cb: Function) {
  let proxy: any = useProxy()
  const stop = watch(() => data, debounce(() => {
    proxy.$Bus.emit("optionChange", {
      [propName]: cb(),
    });
  }, 500), {
    deep: true
  })

  onUnmounted(() => {
    stop()  // 取消监听
    proxy = null
  })
}