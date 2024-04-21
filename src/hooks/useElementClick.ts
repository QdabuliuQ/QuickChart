export default function useElementClick(idx: number, id: string, emits: any) {
	return (event: MouseEvent) => {
		emits('itemClick', {
			idx,
			id,
			e: event
		})
	}
}
