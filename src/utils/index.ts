import { oss } from '@/network'
import { ConfigInt } from '@/types/common'

export const emailPattern = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
export const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxJrpryxju3jgj+fWQTJH
ssl4VvH3HKDI5+MOgea83SRJb5t8zOlaOT8HO7wT5X0E/N+RZdKmWSDUaPE1XtWp
UyxDJNRnxNNnYwQkWsTa21znAur5zN6tWrj/HCZqo4mdqzUtAoaZZAiOCpSb7fgC
xkjZmSB0YJKSpcV7hu3IDEdWjQycZ7CNS7vEhp90VP0H+SokJ9odvEs9MkyF/MFS
RoMJqxXMM4Gd7cfJgQZKEujBPghXMqm6tdmXPjeZn4vIQgC70YGR6xoizZmBYtDY
oEDy9Tu/nJOcunSos1OxiqIfdEa5lgD1lNrPlQ/+nmfonr1CRnKXIBb/KC6XidD0
cwIDAQAB
-----END PUBLIC KEY-----
`

export const debounce = (func: () => void, time: number = 200, immediate = false) => {
	let timer: number | null = null
	return (...args: any) => {
		if (timer) clearTimeout(timer)
		if (immediate) {
			if (!timer) func.apply(this, args)
			timer = window.setTimeout(() => {
				timer = null
			}, time)
		} else {
			timer = window.setTimeout(() => {
				func.apply(this, args)
			}, time)
		}
	}
}

export const deepCopy = (object: any) => {
	if (!object || typeof object != 'object') return
	// 判断是数组还是对象
	const newObject: any = Array.isArray(object) ? [] : {}
	// 遍历对象上每一个属性
	for (const key in object) {
		// 必须是对象上的 而不是原型上的
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			// 判断object[key]的类型
			// 如果还是对象类型，则进行递归拷贝
			// 如果是值类型则直接放入
			newObject[key] = typeof object[key] == 'object' ? deepCopy(object[key]) : object[key]
		}
	}
	return newObject
}

export const fileType = (fileName: string) => {
	// 判断文件类型
	let suffix = '' // 后缀获取
	let result: any = '' // 获取类型结果
	if (fileName) {
		const flieArr = fileName.split('.') // 根据.分割数组
		suffix = flieArr[flieArr.length - 1] // 取最后一个
	}
	if (!suffix) return false // fileName无后缀返回false
	suffix = suffix.toLocaleLowerCase() // 将后缀所有字母改为小写方便操作
	// 匹配图片
	const imgList = ['png', 'jpg', 'jpeg'] // 图片格式
	result = imgList.find((item) => item === suffix)
	if (result) return 'image'
}

export const initCopyConfig = (origin: any, data: any, excludeProp?: Set<string>) => {
	for (const key in origin) {
		if (Object.prototype.hasOwnProperty.call(origin, key)) {
			if (excludeProp && excludeProp.has(key)) continue
			if (Array.isArray(origin[key])) {
				data[key] = [...origin[key]]
			} else if (origin[key] && origin[key] instanceof Object) {
				data[key] = new Object()
				initCopyConfig(origin[key], data[key], excludeProp)
			} else {
				data[key] = origin[key]
			}
		}
	}
}

export const getConfigValue = (config: ConfigInt) => {
	const optionsRes: {
		[propName: string]: any
	} = {}
	for (const key in config) {
		if (!config[key].prefixs) {
			if (config[key].unit) optionsRes[key] = config[key].value + config[key].unit
			else optionsRes[key] = config[key].value
		} else {
			let _prop = optionsRes
			for (const prefix of config[key].prefixs as string[]) {
				if (!_prop[prefix]) {
					_prop[prefix] = {}
				}
				_prop = _prop[prefix]
			}
			if (config[key].unit) _prop[key] = config[key].value + config[key].unit
			else _prop[key] = config[key].value
		}
	}
	return optionsRes
}

export function getInfo() {
	if (localStorage.getItem('info')) return JSON.parse(localStorage.getItem('info') as string)
	return null
}

export function createImage(url: string): HTMLImageElement {
	const image = new Image()
	image.src = url
	image.setAttribute('crossOrigin', 'Anonymous')
	return image
}

export function setImageOption(option: any, isJson: boolean = true) {
	const _option = deepCopy(option)
	if (typeof option.backgroundColor === 'object') {
		_option.backgroundColor.image = _option.backgroundColor.url
		delete _option.backgroundColor.url
		if (_option.graphic.length) {
			for (const item of _option.graphic) {
				if (item.type === 'image') {
					item.style.image = item.style.url
					delete item.style.url
				}
			}
		}
		return isJson ? JSON.stringify(_option) : _option
	}
	return isJson ? JSON.stringify(_option) : _option
}

const base64ToBlob = (code: string) => {
	const parts = code.split(';base64,')
	const contentType = parts[0].split(':')[1]
	const raw = window.atob(parts[1])
	const rawLength = raw.length
	const uInt8Array = new Uint8Array(rawLength)
	for (let i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i)
	}
	return new Blob([uInt8Array], { type: contentType })
}

export function downloadFile(fileName: string, content: string) {
	const aLink = document.createElement('a')
	const blob = base64ToBlob(content) //new Blob([content]);
	const evt = document.createEvent('HTMLEvents')
	evt.initEvent('click', true, true) //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
	aLink.download = fileName
	aLink.href = URL.createObjectURL(blob)
	aLink.dispatchEvent(
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		})
	)
}

export function formatHTML(html: string, tab = '  ') {
	let formatted = '',
		indent = ''
	html.split(/>\s*</).forEach(function (node: string) {
		if (node.match(/^\/\w/)) indent = indent.substring(tab.length)
		formatted += indent + '<' + node + '>\r\n'
		if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab
	})
	return formatted.substring(1, formatted.length - 3)
}

export function generateMapCode(option: any, width: number, height: number, code: string) {
	option = JSON.stringify(option, null, 2)
	option = option.replace(/"(\w+)":/g, '$1:')
	const html =
		`
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
          #chart {
            width: ${width}px;
            height: ${height}px;
          }
        </style>
      </head>
      <body>
        <div id="chart"></div>
        <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js"></script>
        <script>
          $.ajax({
            url: "${oss}/map/cityJSON?adcode=${code}",
            success: function (res) {
              console.log(res)
              const chart = echarts.init(document.getElementById('chart'));
              const option = ${option};
              echarts.registerMap('map', res.data)
              chart.setOption(option);
            }
          })
        </scrip` +
		`t>
      </body>
    </html>
  `
	return html
}

export function htmlDownload(html: string) {
	// 创建一个a标签
	let a: any = document.createElement('a')
	// 创建一个包含blob对象的url
	const url = window.URL.createObjectURL(
		new Blob([html], {
			type: ''
		})
	)
	a.href = url
	a.download = 'chart.html'
	a.click()
	window.URL.revokeObjectURL(url)
	a = null
}

export function base64ToFile(base64: any): File {
	const binary = atob(base64.split(',')[1])
	const array = []
	for (let i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i))
	}
	const blob = new Blob([new Uint8Array(array)], { type: 'image/png' })
	return new File([blob], Date.now() + '.png')
}

export function getMessageOption(type: 'error' | 'success' | 'warning', msg: string) {
	return {
		type,
		message: msg,
		position: 'top-left'
	}
}

export function ajaxRequest(
	request: (prop?: any) => void,
	args?: any,
	time: number = 1000
): Promise<any> {
	return new Promise(async (resolve) => {
		const res = await Promise.all([
			args ? request(args) : request(),
			new Promise((_resolve) => {
				setTimeout(() => {
					_resolve(true)
				}, time)
			})
		])
		resolve(res[0])
	})
}

export function uuid(len: number, radix: number) {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
	const uuid = []
	let i
	radix = radix || chars.length

	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
	} else {
		let r
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
		uuid[14] = '4'
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | (Math.random() * 16)
				uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
			}
		}
	}
	return uuid.join('')
}
