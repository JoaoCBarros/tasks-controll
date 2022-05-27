const routes = require('express').Router()
const { User } = require('./app/models')
const SessionController = require('./modules/session/session.controller')
const authMiddleware = require('./app/middleware/auth')
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)
routes.get('/dashboard' , (req, res) => {
    res.send()
})
//Routers definitions
module.exports = routes