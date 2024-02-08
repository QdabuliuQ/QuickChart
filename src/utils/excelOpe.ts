import * as XLSX from 'xlsx'

// 导出
const xtos = (sdata: any) => {
	const out = XLSX.utils.book_new()
	sdata.forEach(function (xws: any) {
		const aoa: any[] = [[]]
		const rowobj = xws.rows
		for (let ri = 0; ri < rowobj.len; ++ri) {
			const row = rowobj[ri]
			if (!row) continue
			aoa[ri] = []
			Object.keys(row.cells).forEach(function (k) {
				const idx = +k
				if (isNaN(idx)) return
				aoa[ri][idx] = row.cells[k].text
			})
		}
		const ws = XLSX.utils.aoa_to_sheet(aoa)
		XLSX.utils.book_append_sheet(out, ws, xws.name)
	})
	return out
}

// 导出文件
export const exportFile = (data: any) => {
	const new_wb = xtos(data)
	/* generate download */
	XLSX.writeFile(new_wb, `data.xlsx`)
}

const fixData = (data: any) => {
	let o = '',
		l = 0
	const w = 10240
	for (; l < data.byteLength / w; ++l)
		o += String.fromCharCode.apply(null, [...new Uint8Array(data.slice(l * w, l * w + w))])
	o += String.fromCharCode.apply(null, [...new Uint8Array(data.slice(l * w))])
	return o
}

// 导入文件
export const importFile = (file: any, callback: (workbook: any) => void) => {
	const reader = new FileReader()
	let workbook
	reader.onload = (e: any) => {
		const data = e.target.result
		const fixedData = fixData(data)
		workbook = XLSX.read(btoa(fixedData), { type: 'base64' })

		callback(workbook)
	}
	reader.readAsArrayBuffer(file)
}

export const stox = (wb: any) => {
	const out: any[] = []
	wb.SheetNames.forEach(function (name: string) {
		const o: any = { name: name, rows: {}, merges: [] }
		const ws = wb.Sheets[name]
		const aoa = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 })
		aoa.forEach(function (r: any, i: any) {
			const cells: any = {}
			r.forEach(function (c: any, j: any) {
				cells[j] = { text: c }
			})
			o.rows[i] = { cells: cells }
		})
		// 设置合并单元格
		ws['!merges']?.forEach((merge: any) => {
			// 修改 cell 中 merge [合并行数,合并列数]
			let cell = o.rows[merge.s.r].cells[merge.s.c]

			//无内容单元格处理
			if (!cell) {
				cell = { text: '' }
			}
			cell.merge = [merge.e.r - merge.s.r, merge.e.c - merge.s.c]
			o.rows[merge.s.r].cells[merge.s.c] = cell

			// 修改 merges
			o.merges.push(XLSX.utils.encode_range(merge))
		})
		out.push(o)
	})
	return out
}
