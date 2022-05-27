const SessionRepository = require('./session.repository')
const createSession = async (email, password) => {
    const user = await SessionRepository.findUserByEmail(email)

    if(!user){
        throw {statusCode: 401, message: 'User not found'}
    }

    if(!(await user.checkPassword(password))){
        throw {statusCode: 401, message: 'Invalid credentials'}
    }

    return {
        user,
        token: user.generateToken()
    }
}
module.exports = {
    createSession
}