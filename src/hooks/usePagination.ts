import {ref} from "vue";

  export default function (handle: Function, l: number = 0, t: number = 0, o: number = 1) {
  const limit = ref<number>(l)
  const total = ref<number>(t)
  const offset = ref<number>(o)

  const changeEvent = (e: number) => {
    offset.value = e
    handle && handle(e)
  }

  return [
    limit,
    total,
    offset,
    changeEvent
  ]
}