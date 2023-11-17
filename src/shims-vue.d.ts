/* eslint-disable */
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'vue-highlightjs'
declare module 'x-data-spreadsheet/src/locale/zh-cn'
declare module 'recordrtc';
declare module 'worker-loader!@/workers/worker.ts'
declare module 'worker-loader!@/workers/worker'
declare module 'dom-to-image'