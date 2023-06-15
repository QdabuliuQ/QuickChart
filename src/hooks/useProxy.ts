import { ComponentInternalInstance, getCurrentInstance, ref } from "vue";

export default function () {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return proxy
}