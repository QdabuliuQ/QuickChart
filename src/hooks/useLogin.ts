import useProxy from "@/hooks/useProxy";

export function useLogin(trigger: boolean = true): boolean | Object {
  const proxy = useProxy()
  if(!localStorage.getItem('token') || !localStorage.getItem('id')) {
    if (trigger) {
      proxy.$notice({
        type: 'warning',
        message: '请先登录再进行操作',
        position: "top-left",
      })
      proxy.$Bus.emit('showLoginDialog')
    }
    return false
  }
  return JSON.parse(localStorage.getItem('info') as string)
}