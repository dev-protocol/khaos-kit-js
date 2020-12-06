import test from 'ava'
import { ethereum } from './endpoint'

test('Exports Khaos endpoints for Ethereum mainnet', (t) => {
	t.is(ethereum.mainnet, 'https://khaos-eth-mainnet.azurewebsites.net')
})

test('Exports Khaos endpoints for Ethereum ropsten', (t) => {
	t.is(ethereum.ropsten, 'https://khaos-eth-ropsten.azurewebsites.net')
})
