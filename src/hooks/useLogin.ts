import useProxy from "@/hooks/useProxy";

export function useLogin() {
  const proxy = useProxy()

  if(!localStorage.getItem('token') || !localStorage.getItem('id')) {
    proxy.$notice({
      type: 'warning',
      message: '请先登录再进行操作',
      position: "top-left",
    })
    proxy.$Bus.emit('showLoginDialog')
  } else {

  }
}