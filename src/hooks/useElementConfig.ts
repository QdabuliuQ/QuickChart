import useStore from "@/store";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {Chart, ElementTypeProperties, Image, Shape, Text} from "@/types/screen";
import useProxy from "@/hooks/useProxy";
import {debounce} from "@/utils";
import {setCommonStyle} from "@/utils/screenUtil";

export function useElementConfig<T extends Image | Chart | Text | Shape>() {
  const proxy = useProxy()
  const {screen} = useStore()
  const baseInfo = ref(screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<T['type']>)
  const idx = ref<number>(-1)
  let info = ref<T>(null as any)

  const deleteEvent = () => {  // 删除图表
    proxy.$Bus.emit("deleteChart", screen.curElementIdx)
  }

  const updateInfo = () => {
    if (screen.getCurElementIdx !== -1) {
      idx.value = screen.getCurElementIdx
      info.value = JSON.parse(JSON.stringify(screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<'chart'>))
    }
  }

  let stop = watch(() => info, debounce(() => {
    setCommonStyle(baseInfo, info)
    screen.updateScreenOptionOfElementStyle(JSON.parse(JSON.stringify(info.value!.style)), idx.value)
  }), {
    deep: true
  })
  let stop2 = watch(() => screen.curElementIdx, () => {
    baseInfo.value = screen.getScreenOptionOfElements[screen.getCurElementIdx]
    updateInfo()
  })

  onMounted(() => {
    updateInfo()
  })

  onUnmounted(() => {
    stop()
    stop2()
  })

  return {
    baseInfo,
    info,
    idx,
    deleteEvent
  }
}