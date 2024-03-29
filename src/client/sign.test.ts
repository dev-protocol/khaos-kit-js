import test from 'ava'
import Sinon, { fake, stub } from 'sinon'
import { endpoint } from '../util/endpoint'
import { sign } from './sign'
import * as x from '../_lib/_defaultExport'

const bentFakeFetcher = fake.returns(Promise.resolve()) as Sinon.SinonSpy<any>
const bentFakeCaller = fake.returns(bentFakeFetcher)
const bentStub = stub(x, 'bent').callsFake(bentFakeCaller)

test.after(() => {
	bentStub.restore()
})

test('Send sign request', async (t) => {
	await sign(
		'test',
		'ropsten'
	)({
		message: 'TEST_MESSAGE',
		signature: 'TEST_SIGNATURE',
		secret: 'TEST_SECRET',
	})

	t.deepEqual(bentFakeCaller.getCall(0).args, [
		`${endpoint.ropsten}/sign/test`,
		'POST',
		'json',
	])
	t.deepEqual(bentFakeFetcher.getCall(0).args, [
		'/',
		{
			signature: 'TEST_SIGNATURE',
			secret: 'TEST_SECRET',
			message: 'TEST_MESSAGE',
		},
	])
})

test('Send sign request as mainnet by default', async (t) => {
	await sign('test')({
		message: 'TEST_MESSAGE',
		signature: 'TEST_SIGNATURE',
		secret: 'TEST_SECRET',
	})

	t.deepEqual(bentFakeCaller.getCall(1).args, [
		`${endpoint.mainnet}/sign/test`,
		'POST',
		'json',
	])
	t.deepEqual(bentFakeFetcher.getCall(1).args, [
		'/',
		{
			signature: 'TEST_SIGNATURE',
			secret: 'TEST_SECRET',
			message: 'TEST_MESSAGE',
		},
	])
})
