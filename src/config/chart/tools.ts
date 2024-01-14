const EMPTY: string = 'EMPTY'

export const replaceOptionValue = (origin: any, option: any): void => {
	if (!origin || !option) return
	for (const key in option) {
		if (key.indexOf('.') == -1) {
			if (option[key] === EMPTY) {
				delete origin[key]
			} else if (origin[key]) {
				origin[key] = option[key] as any
			}
		} else {
			const keys = key.split('.')
			let data: any = origin
			for (let i = 0; i < keys.length - 1; i++) {
				data = data[keys[i]]
			}

			if (option[key] === EMPTY) delete data[keys[keys.length - 1]]
			else data[keys[keys.length - 1]] = option[key]
		}
	}
}
