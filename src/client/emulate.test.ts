import test from 'ava'
import { fake, stub } from 'sinon'
import { endpoint } from '../util/endpoint'
import * as x from '../_lib/_defaultExport'
import { emulate } from './emulate'

const bentFakeFetcher = fake.returns(Promise.resolve({ data: 'just a test' }))
const bentFakeCaller = fake.returns(bentFakeFetcher)
const bentStub = stub(x, 'bent').callsFake(bentFakeCaller)

test.after(() => {
	bentStub.restore()
})

test('Send emulate request', async (t) => {
	const res = await emulate(
		'test',
		'ropsten'
	)({
		event: {
			args: {
				myParam: 1,
			},
		},
	})

	t.deepEqual(res, { data: 'just a test' } as any)
	t.deepEqual(bentFakeCaller.getCall(0).args, [
		`${endpoint.ropsten}/emulate/test`,
		'POST',
		'json',
	])
	t.deepEqual(bentFakeFetcher.getCall(0).args, [
		'/',
		{
			network: 'ropsten',
			event: {
				args: {
					myParam: 1,
				},
			},
		},
	])
})

test('Send sign request as mainnet by default', async (t) => {
	const res = await emulate('test')({
		event: {
			args: {
				myParam: 1,
			},
		},
	})

	t.deepEqual(res, { data: 'just a test' } as any)
	t.deepEqual(bentFakeCaller.getCall(1).args, [
		`${endpoint.mainnet}/emulate/test`,
		'POST',
		'json',
	])
	t.deepEqual(bentFakeFetcher.getCall(1).args, [
		'/',
		{
			network: 'mainnet',
			event: {
				args: {
					myParam: 1,
				},
			},
		},
	])
})
