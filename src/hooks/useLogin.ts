import useProxy from '@/hooks/useProxy'
export function useLogin(trigger: boolean = true): boolean | Record<string, any> {
	const proxy = useProxy()
	if (!localStorage.getItem('token') || !localStorage.getItem('id')) {
		if (trigger) {
			proxy?.$Bus.emit('showLoginDialog')
		}
		return false
	}
	return JSON.parse(localStorage.getItem('info') as string)
}
