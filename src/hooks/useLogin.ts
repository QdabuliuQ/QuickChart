import useProxy from "@/hooks/useProxy";
import {ComponentInternalInstance, getCurrentInstance} from "vue";
import { ElNotification } from 'element-plus'
export function useLogin(trigger: boolean = true): boolean | Object {
  const proxy = useProxy()
  if(!localStorage.getItem('token') || !localStorage.getItem('id')) {
    if (trigger) {
      proxy?.$Bus.emit('showLoginDialog')
    }
    return false
  }
  return JSON.parse(localStorage.getItem('info') as string)
}