import { colors } from '@/config/chart/constant'

export default function getColor(data: any, type?: string) {
	const l: number = colors.length,
		res: any[] = []
	for (let i = 0; i < data.length; i++) {
		if (type == 'all') {
			res.push({
				title: '系列' + (i + 1),
				c: colors[i % l]
			})
		} else {
			res.push(colors[i % l])
		}
	}
	return res
}
