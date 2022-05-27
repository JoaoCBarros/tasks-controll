const request = require('supertest')
const app = require('../../app')
const { User } = require('../../app/models')
const truncate = require('../../../test/utils/truncate')
const factory = require('../../../test/factories')
describe('Authentication' , () => {

    beforeEach(async () => {
        await truncate()
    })
    
    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app).post('/sessions')
        .send({
            email: user.email,
            password: '123123'
        })

        expect(response.status).toBe(200)
    })

    it('should not authenticate if user not found' , async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app).post('/sessions')
        .send({
            email: "joao2@test.com",
            password: "123123"
        })

        expect(response.status).toBe(401)
    })

    it('should not authenticate with invalid credentials' , async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app).post('/sessions')
        .send({
            email: user.email,
            password: '456456'
        })

        expect(response.status).toBe(401)
    })

    it('should return jwt token when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app).post('/sessions')
        .send({
            email: user.email,
            password: '123123'
        })

        expect(response.body).toHaveProperty('token')
    })

    it('should be able to access private routes when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app).get('/dashboard')
        .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200)
    })

    it('should not be able to access private routes when not jwt token', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app).get('/dashboard')

        expect(response.status).toBe(401)
    })

    it('should not be able to access private routes when have invalid jwt token', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app).get('/dashboard')
        .set('Authorization', `Bearer 123123`)

        expect(response.status).toBe(401)
    })
})