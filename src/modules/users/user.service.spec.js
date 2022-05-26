const userService = require('./user.service')

describe('Test User Service', () => {
    test('It should sum 1 + 2 with result equal 3', () => {
        expect(userService.sum(1,2)).toBe(3)
    })

    test('It should sum 1 + 1 and result is not should equal 3', () => {
        expect(userService.sum(1,1)).not.toBe(3)
    })

    test('')
})