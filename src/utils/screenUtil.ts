import useStore from '@/store'

import { uuid } from '@/utils/index'

import { Border, Elements, ElementTypeProperties } from '@/types/screen'

const { screen } = useStore()
export function setCommonStyle(baseInfo: any, info: any) {
	info.value!.style['width'] = baseInfo.value.style['width']
	info.value!.style['height'] = baseInfo.value.style['height']
	info.value!.style['translateX'] = baseInfo.value.style['translateX']
	info.value!.style['translateY'] = baseInfo.value.style['translateY']
	info.value!.style['rotate'] = baseInfo.value.style['rotate']
}

function resetConfig<T extends Elements>(
	originConfig: ElementTypeProperties<T>,
	newConfig: Partial<ElementTypeProperties<T>>
) {
	const reset = (o: any, n: any) => {
		console.log(n, 'nnn')
		for (const key in n) {
			if (Object.prototype.hasOwnProperty.call(n, key)) {
				if (typeof n[key] === 'object' && !Array.isArray(n[key])) {
					reset(o[key], n[key])
				} else {
					o[key] = n[key]
				}
			}
		}
	}
	reset(originConfig, newConfig)
}
export function getTextConfig(config?: ElementTypeProperties<'text'>) {
	const originConfig: ElementTypeProperties<'text'> = {
		id: uuid(6, 36),
		type: 'text',
		content: '插入文本内容',
		isLock: false,
		style: {
			display: 'block',
			fontSize: 14,
			fontWeight: 'normal',
			color: '#000',
			width: 200,
			height: 50,
			translateX: 0,
			translateY: 0,
			rotate: 0,
			zIndex: 1,
			textAlign: 'center',
			letterSpacing: 0,
			fontStyle: 'normal',
			lineHeight: 16,
			textDecorationLine: 'none',
			textDecorationColor: '#000',
			textDecorationStyle: 'solid',
			backgroundColor: 'rgba(0,0,0,0)'
		}
	}
	if (config) {
		resetConfig(originConfig, config)
	}
	return originConfig
}

export const getShapeConfig = (config?: ElementTypeProperties<'shape'>) => {
	const originConfig: ElementTypeProperties<'shape'> = {
		id: uuid(6, 36),
		type: 'shape',
		isLock: false,
		viewBox: [200, 200],
		path: '',
		style: {
			display: 'block',
			fill: '#f8b557',
			stroke: 'rgba(0,0,0,0)',
			strokeWidth: 0,
			shadowColor: 'rgba(0,0,0,0)',
			shadowX: 0,
			shadowY: 0,
			shadowBlur: 5,
			width: 50,
			height: 50,
			translateX: 0,
			translateY: 0,
			rotate: 0,
			zIndex: 1
		}
	}
	if (config) {
		resetConfig(originConfig, config)
	}
	return originConfig
}
export function getImageConfig(config?: any) {
	const originConfig: ElementTypeProperties<'image'> = {
		id: uuid(6, 36),
		type: 'image',
		isLock: false,
		url: '',
		file: '',
		style: {
			display: 'block',
			width: 200,
			height: 130,
			translateX: 200,
			translateY: 200,
			rotate: 0,
			zIndex: 1,
			borderColor: 'rgba(0,0,0,0)',
			borderWidth: 0,
			borderType: 'none',
			shadowColor: 'rgba(0,0,0,0)',
			shadowX: 0,
			shadowY: 0,
			shadowBlur: 0
		}
	}
	if (config) {
		resetConfig(originConfig, config)
	}
	return originConfig
}
export function getBorderConfig(config?: Partial<Border>) {
	const originConfig: Border = {
		id: uuid(6, 36),
		type: 'border',
		isLock: false,
		code: 1,
		style: {
			display: 'block',
			width: 200,
			height: 130,
			translateX: 0,
			translateY: 0,
			rotate: 0,
			zIndex: 1,
			color1: '#6586EC',
			color2: '#2CF7FE'
		}
	}
	if (config) {
		resetConfig<'border'>(originConfig, config)
	}
	return originConfig
}

export function cutElement(i: number) {
	screen.setTmpElement(screen.deleteScreenOptionOfElements(i)[0])
}
export function lockElement(i: number) {
	screen.updateElementOfItem(i, 'isLock', true)
	screen.updateCurElementIdx(-1)
}
export function unlockElement(i: number) {
	screen.updateElementOfItem(i, 'isLock', false)
}
export function getOffset(val1: number, val2: number, val3: number) {
	return ((val1 * val3) / val2).toFixed(2)
}
