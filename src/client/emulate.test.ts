import test from 'ava'
import { fake, stub } from 'sinon'
import { ethereum } from '../util/endpoint'
import * as x from '../_lib/_defaultExport'
import { emulate } from './emulate'

const bentFakeFetcher = fake.returns(Promise.resolve())
const bentFakeCaller = fake.returns(bentFakeFetcher)
const bentStub = stub(x, 'bent').callsFake(bentFakeCaller)

test.after(() => {
	bentStub.restore()
})

test('Send emulate request', async (t) => {
	await emulate(
		'test',
		'ropsten'
	)({
		myParam: 1,
	})

	t.deepEqual(bentFakeCaller.getCall(0).args, [
		`${ethereum.ropsten}/emulate/test`,
		'POST',
		'json',
	])
	t.deepEqual(bentFakeFetcher.getCall(0).args, [
		'/',
		{
			myParam: 1,
		},
	])
})

test('Send sign request as mainnet by default', async (t) => {
	await emulate('test')({
		myParam: 1,
	})

	t.deepEqual(bentFakeCaller.getCall(1).args, [
		`${ethereum.mainnet}/emulate/test`,
		'POST',
		'json',
	])
	t.deepEqual(bentFakeFetcher.getCall(1).args, [
		'/',
		{
			myParam: 1,
		},
	])
})
