import { app, server } from '../app'
import supertest from 'supertest'

const api  = supertest(app)

test('GET /api/v1/', async () => {
	const res = await api.get('/api/v1/')
	expect(res.status).toBe(200)
	expect(res.type).toBe('application/json')
	expect(JSON.parse(res.text)).toEqual({ message: 'PayFlow API version 1.0.0' })
})

afterAll(() => {
	server.close()
})