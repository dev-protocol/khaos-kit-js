import { NetworkName } from '@devprotocol/khaos-core'
import { endpoint } from '../util/endpoint'
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
type ExpectedTransaction = {
	readonly gasLimit?: string
	readonly success: boolean
}

export type KhaosEmulateResponse = {
	readonly data?: Merge<
		PackResponse,
		{ readonly expectedTransaction: ExpectedTransaction }
	>
}

export const emulate = (
	id: string,
	network: NetworkName = 'mainnet'
): ((options: KhaosEmulateOptions) => Promise<KhaosEmulateResponse>) => {
	const fetcher = bent(
		`${
			endpoint[
				network === 'arbitrum-one'
					? 'arbitrumOne'
					: network === 'arbitrum-rinkeby'
					? 'arbitrumRinkeby'
					: network === 'polygon-mainnet'
					? 'polygonMainnet'
					: network === 'polygon-mumbai'
					? 'polygonMumbai'
					: network
			]
		}/emulate/${id}`,
		'POST',
		'json'
	)
	return (options: KhaosEmulateOptions): Promise<KhaosEmulateResponse> =>
		fetcher('/', { ...options, ...{ network } }).then(
			(r) => r as unknown as KhaosEmulateResponse
		)
}
