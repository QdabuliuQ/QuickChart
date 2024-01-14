import { ListInt } from '@/config/chart/constant'

export type TOption =
	| null
	| 'imgload'
	| 'select'
	| 'input_number'
	| 'input_text'
	| 'color_picker'
	| 'switch'

export type TCommonOption = {
	title: string
	pre?: string
	suf?: string
}
export type IImgload = {
	type: 'imgload'
	imgType: 'base64' | 'url'
	imgSize?: number
	url?: string
	value: string
} & TCommonOption
export type IInputNumber = {
	type: 'input_number'
	max?: number
	min?: number
	step?: number
	value: number
} & TCommonOption
export type ISwitch = {
	type: 'switch'
	value: boolean
} & TCommonOption
export type TColorPicker = {
	type: 'color_picker'
	value: string
} & TCommonOption
export type TSelect = {
	type: 'select'
	value: string
	options: Array<ListInt>
} & TCommonOption
export type TInputText = {
	type: 'input_text'
	value: string
	max?: number
} & TCommonOption
export type TSelectOption = {
	key: any
	label: any
	value: any
}
export type IOption<T extends TOption> = T extends 'imgload'
	? IImgload
	: T extends 'input_number'
		? IInputNumber
		: T extends 'switch'
			? ISwitch
			: T extends 'color_picker'
				? TColorPicker
				: T extends 'select'
					? TSelect
					: T extends 'input_text'
						? TInputText
						: any
