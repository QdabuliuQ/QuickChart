export const enum ShapePathFormulasKeys {
	ROUND_RECT = 'roundRect',
	ROUND_RECT_DIAGONAL = 'roundRectDiagonal',
	ROUND_RECT_SINGLE = 'roundRectSingle',
	ROUND_RECT_SAMESIDE = 'roundRectSameSide',
	CUT_RECT_DIAGONAL = 'cutRectDiagonal',
	CUT_RECT_SINGLE = 'cutRectSingle',
	CUT_RECT_SAMESIDE = 'cutRectSameSide',
	CUT_ROUND_RECT = 'cutRoundRect',
	MESSAGE = 'message',
	ROUND_MESSAGE = 'roundMessage',
	L = 'L',
	RING_RECT = 'ringRect',
	PLUS = 'plus',
	TRIANGLE = 'triangle',
	PARALLELOGRAM_LEFT = 'parallelogramLeft',
	PARALLELOGRAM_RIGHT = 'parallelogramRight',
	TRAPEZOID = 'trapezoid',
	BULLET = 'bullet',
	INDICATOR = 'indicator'
}
export interface ShapePoolItem {
	viewBox: [number, number]
	path: string
	special?: boolean
	pathFormula?: ShapePathFormulasKeys
	outlined?: boolean
	pptxShapeType?: string
}
export interface ShapeListItem {
	type: string
	children: ShapePoolItem[]
}
