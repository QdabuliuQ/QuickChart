const initRows = (rows: any) => {
	const res: any = {}
	const length: number = Object.keys(rows).length - 1
	for (let i = 0; i < length; i++) {
		if (!rows[i]) continue
		let emptyIdx = 0
		res[i] = {
			cells: {}
		}
		const rowLength: number = Object.keys(rows[i].cells).length
		for (let j = rowLength - 1; j >= 0; j--) {
			if (JSON.stringify(rows[i].cells[j]) !== '{}' || Object.keys(res[i].cells).length) {
				res[i].cells[j] = {
					text: rows[i].cells[j].text ? rows[i].cells[j].text : ''
				}
			} else {
				emptyIdx++
			}
		}
		if (emptyIdx == rowLength && i == length - 1) {
			delete res[i]
		}
	}
	return res
}

addEventListener('message', (e) => {
	const { data, options, type, handle }: any = e.data
	const fun = eval(`(${handle})`)
	const r = initRows(JSON.parse(data))
	const res = fun(r, JSON.parse(options))
	return postMessage({
		res,
		type
	})
})
