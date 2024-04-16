import jwt from 'jsonwebtoken'
import { secret } from '../utils/contants'
import { generateToken, verifyToken } from '../utils/generateSessionToken'

jest.mock('jsonwebtoken', () => ({
	sign: jest.fn().mockReturnValue('testing_token'),
	verify: jest.fn().mockReturnValue({ foo: 'bar' })
}))

describe('JWT Utils', () => {
	describe('Generate Token function', () => {
		test('Should generate a new JWT with the provided data', () => {
			const token = generateToken({ foo: 'bar' })
			expect(jwt.sign).toHaveBeenCalledWith({ foo: 'bar' }, secret)
			expect(token).toBe('testing_token')
		})
	})

	describe('Verify token function', () => {
		test('Shuld return the decoded data from the token', () => {
			const decoded = verifyToken('testing_token')
			expect(jwt.verify).toHaveBeenCalledWith('testing_token', secret)
			expect(decoded).toEqual({ foo: 'bar' })
		})
	})
})