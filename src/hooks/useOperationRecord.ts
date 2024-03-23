import useStore from '@/store'

import { IOperation } from '@/types/screen'

export function useOperationRecord() {
	const { screen } = useStore()

	return (record: IOperation) => {
		screen.addOperationRecordItem(record)
	}
}
