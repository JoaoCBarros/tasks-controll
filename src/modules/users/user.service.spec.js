const bcrypt = require("bcryptjs/dist/bcrypt")
const truncate = require("../../../test/utils/truncate")
const { User } = require('../../app/models')

describe('User', () => {
    beforeEach(async () => {
        await truncate()
    })
    
    it('should encrypt user password', async () => {
        const user = await User.create({
            name: "João",
            email: "joao@test.com",
            password: "123123"
        })
        
        const hash = await bcrypt.hash('123123', 8)

        expect(await bcrypt.compare('123123', user.password_hash)).toBe(true)
    })
})