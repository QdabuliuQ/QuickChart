import { ComponentInternalInstance, getCurrentInstance, ref } from "vue";
export default function () {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  return appContext.config.globalProperties;
}