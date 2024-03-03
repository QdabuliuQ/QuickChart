// 创建消息频道
const channel = new BroadcastChannel('preview')

export function sendMsg(type: string, data?: any) {
	// 发送消息
	channel.postMessage({
		type,
		data
	})
}

export function listenMsg(callback: (data: any) => void) {
	// 监听消息
	channel.addEventListener('message', (e) => {
		callback && callback(e.data)
	})
}
