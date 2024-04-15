import { compare, hash } from 'bcrypt'
import { encryptPassword, comparePassword } from '../utils/encryptingPassword'

jest.mock('bcrypt', () => ({
	hash: jest.fn().mockResolvedValue('hashed_password'),
	compare: jest.fn().mockResolvedValue(true)
}))

describe('Encrypting Password', () => {
	test('Should encrypt password', async () => {
		const encryptedPassword = await encryptPassword('pass123')
		expect(hash).toHaveBeenCalledWith('pass123', expect.any(Number))
		expect(encryptedPassword).toBe('hashed_password')
	})

	test('Should compare password', async () => {
		const comparedPassword = await comparePassword('pass123', 'hashed_password')
		expect(compare).toHaveBeenCalledWith('pass123', 'hashed_password')
		expect(comparedPassword).toBe(true)
	})
})