import { ethereum } from '../util/endpoint'
import { bent } from '../_lib/_defaultExport'
import { call } from '@devprotocol/khaos-functions'
import { PromiseValue } from 'type-fest'

const _pack = call()({
	method: 'pack',
	options: { results: { status: 0, statusMessage: '', message: '' } },
})

export type KhaosEmulateOptions = Readonly<
	Record<string, string | number | boolean>
>

export const emulate = (
	id: string,
	network: keyof typeof ethereum = 'mainnet'
): ((options: KhaosEmulateOptions) => Promise<PromiseValue<typeof _pack>>) => {
	const fetcher = bent(`${ethereum[network]}/emulate/${id}`, 'POST', 'json')
	return (options: KhaosEmulateOptions): typeof _pack =>
		fetcher('/', options).then(
			(r) => (r as unknown) as PromiseValue<typeof _pack>
		)
}
