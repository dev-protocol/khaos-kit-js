import test from 'ava'
import { endpoint } from './endpoint'

test('Exports Khaos endpoints for Ethereum mainnet', (t) => {
	t.is(endpoint.mainnet, 'https://khaos-eth-mainnet.azurewebsites.net')
})

test('Exports Khaos endpoints for Ethereum ropsten', (t) => {
	t.is(endpoint.ropsten, 'https://khaos-eth-ropsten.azurewebsites.net')
})

test('Exports Khaos endpoints for Arbitrum one', (t) => {
	t.is(endpoint.arbitrumOne, 'https://khaos-arb-one.azurewebsites.net')
})

test('Exports Khaos endpoints for Arbitrum rinkeby', (t) => {
	t.is(endpoint.arbitrumRinkeby, 'https://khaos-arb-rinkeby.azurewebsites.net')
})
