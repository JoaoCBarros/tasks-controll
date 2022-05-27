const SessionService = require('./session.service')
class SessionController {
    async store(req, res) {
        const {email, password} = req.body
        try {
            return res.json(await SessionService.createSession(email, password))
        } catch (error) {
            return res.status(error.statusCode).json({message: error.message})
        }
    }
}

module.exports = new SessionController()