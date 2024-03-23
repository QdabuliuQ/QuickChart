import { AxiosResponse } from 'axios'

export type ResponseType = Promise<
	AxiosResponse<{
		status: 0 | 1
		msg: string
		[propName: string]: any
	}>
>
