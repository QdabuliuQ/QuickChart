import {ref} from "vue";
import {Elements, ElementTypeProperties} from "@/types/screen";

export function useCopyElement() {
  let element = ref<any>()

  const getElementByNewPoint = (x: number, y: number) => {
    if (!element.value) return
    element.value.style.translateY = y
    element.value.style.translateX = x
    return element.value
  }

  return [
    element,
    getElementByNewPoint
  ]
}