export default function useElementClick(idx: number, emits: any) {
	return (event: MouseEvent) => {
		emits('itemClick', {
			idx,
			e: event
		})
	}
}
