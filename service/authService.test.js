const authService = require('./authService');
const usersRepository = require('../repositories/usersRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

jest.mock('jsonwebtoken', () => ({
    ...jest.requireActual('jsonwebtoken'),
    sign: jest.fn()
}));

jest.mock('../repositories/usersRepository', () => ({
    create: jest.fn(),
    findOne: jest.fn()
}));

describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Test register', async () => {
        const newUser = {
            firstname: 'Toto',
            lastname: 'Toto',
            password: '1234',
            email: 'toto@toto.com'
        };

        usersRepository.create.mockResolvedValue(newUser);

        const result = await authService.register(newUser);

        expect(result).toEqual(true);

        expect(usersRepository.create).toHaveBeenCalledWith(expect.objectContaining(newUser));
    });

    it('Test login', async () => {
        const password = await bcrypt.hash('1234', 10);

        const user = {
            firstname: 'Toto',
            lastname: 'Toto',
            password: password,
            email: 'toto@toto.com'
        };

        const loggingUser = {
            password: '1234',
            email: 'toto@toto.com'
        }

        usersRepository.findOne.mockResolvedValue(user);
        jwt.sign.mockReturnValue('1234');

        const result = await authService.login(loggingUser);

        expect(result).toEqual('1234');
    });
});