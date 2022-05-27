const { User } = require("../../app/models")

const findUserByEmail = async (email) => {
    return await User.findOne({where: {email}})
}

module.exports = {
    findUserByEmail
}