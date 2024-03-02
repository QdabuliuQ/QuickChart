const chartModules: Record<string, any> = import.meta.glob('@/config/chart/config/chart/*/*.ts')
const mapModules: Record<string, any> = import.meta.glob('@/config/chart/config/map/*/*.ts')

export const importChartFile = (path: string) => {
	const _path = `/src/config/chart/config` + path
	if (chartModules[_path]) return chartModules[_path]
	else {
		// 地址错误
		console.error('Error url is wrong path')
	}
}

export const importMapFile = (path: string) => {
	const _path = `/src/config/chart/config` + path
	if (mapModules[_path]) return mapModules[_path]
	else {
		// 地址错误
		console.error('Error url is wrong path')
	}
}
