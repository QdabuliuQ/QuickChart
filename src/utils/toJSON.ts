export function stringify(obj: any): any {
	try {
		return JSON.stringify(obj, (_, v) => {
			if (typeof v === 'function') {
				return `FUNCTION_FLAG ${v}`
			} else {
				return v
			}
		})
	} catch (error) {
		console.log(error)
	}
}

export function parse(jsonStr: string): any {
	try {
		jsonStr = jsonStr.replace(/\n/g, '')
		return JSON.parse(jsonStr, (_, value) => {
			if (value && typeof value === 'string') {
				return value.indexOf('FUNCTION_FLAG') > -1
					? new Function(`return ${value.replace('FUNCTION_FLAG', '')}`)()
					: value
			}
			return value
		})
	} catch (error) {
		console.log(error)
	}
}
