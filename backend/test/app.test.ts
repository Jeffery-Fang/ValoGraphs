import 'supertest'
import http from 'http'
import app from '../src/app.js'

let server: http.Server

beforeAll((done): void => {
    server = app.listen(3000, (): void => {
        done()
    })
})

afterAll((done): void => {
    server.close((): void => {
        done()
    })
})

describe('GET /user', (): void => {
    test('', (): void => {
        expect(1 + 1).toBe(2)
    })
})
