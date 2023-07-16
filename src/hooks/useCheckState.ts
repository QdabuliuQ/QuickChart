
export function useCheckState() {
  let check = null
  if(!localStorage.getItem('token') || !localStorage.getItem('id')) {
    check = (proxy: any) => {
      proxy.$Bus.emit('showLoginDialog')
    }
  }
  return {
    check
  }
}