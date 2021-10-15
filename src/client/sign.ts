import { endpoint } from '../util/endpoint'
import { bent } from '../_lib/_defaultExport'

export type KhaosSignOptions = {
	readonly message: string
	readonly signature: string
	readonly secret: string
}

export type KhaosSignResponse = {
	readonly address: string
	readonly publicSignature: string
}

export const sign = (
	id: string,
	network: keyof typeof endpoint = 'mainnet'
): ((options: KhaosSignOptions) => Promise<KhaosSignResponse>) => {
	const fetcher = bent(`${endpoint[network]}/sign/${id}`, 'POST', 'json')
	return ({
		message,
		signature,
		secret,
	}: KhaosSignOptions): Promise<KhaosSignResponse> =>
		fetcher('/', {
			signature,
			secret,
			message,
		}).then((r) => (r as unknown) as KhaosSignResponse)
}
