import { hash, compare } from 'bcrypt'
import { salt } from './contants'

export const encryptPassword = async (password: string): Promise<string> => {
	return await hash(password, salt)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
	return await compare(password, hash)
}
