import { ethereum } from '../util/endpoint'
import { bent } from '../_lib/_defaultExport'
import { V0Results, PackOptions } from '@devprotocol/khaos-functions'
import { PromiseValue, SetOptional, Merge } from 'type-fest'
import { Event } from '@ethersproject/contracts'

type ArgsWrap = {
	readonly args: Record<string, string | number | undefined | null>
}

type MergedEvent = Merge<Event, ArgsWrap>

export type KhaosEmulateOptions = {
	readonly event: SetOptional<MergedEvent, keyof MergedEvent>
}

type PackResponse = NonNullable<PromiseValue<V0Results<PackOptions>>['data']>

export type KhaosEmulateResponse = {
	readonly data?: Merge<PackResponse, { readonly gasLimit?: string }>
}

export const emulate = (
	id: string,
	network: keyof typeof ethereum = 'mainnet'
): ((options: KhaosEmulateOptions) => Promise<KhaosEmulateResponse>) => {
	const fetcher = bent(`${ethereum[network]}/emulate/${id}`, 'POST', 'json')
	return (options: KhaosEmulateOptions): Promise<KhaosEmulateResponse> =>
		fetcher('/', { ...options, ...{ network } }).then(
			(r) => (r as unknown) as KhaosEmulateResponse
		)
}
