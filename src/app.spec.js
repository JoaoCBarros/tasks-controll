const request = require('supertest')
const app = require('./app')

describe('Test app path', () => {
    test("It should response to GET method", async () => {
        return expect((await request(app).get('/')).statusCode).toBe(200)
    })
    test("It should response 404 to GET method", async () => {
        return expect((await request(app).get('/notfound')).statusCode).toBe(404)
    })
})