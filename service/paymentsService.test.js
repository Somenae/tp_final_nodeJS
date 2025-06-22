const registrationsRepository = require('../repositories/registrationsRepository');
const paymentsService = require('./paymentsService');

jest.mock('../repositories/registrationsRepository', () => ({
    findByUser: jest.fn(),
    findRegisteredUsers: jest.fn()
}));

describe('documentsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Test getUserPayments', async () => {
        const trips = {
            userId: '1',
            travelId: '2',
            departure: 'Toto',
            destination: 'Toto',
            requiredDocuments: '1234'
        };

        registrationsRepository.findByUser.mockResolvedValue(trips);

        const result = await paymentsService.getUserPayments('1')

        expect(result).toEqual(trips);
    });

    it('Test getRegisteredUsers', async () => {
        const trips = {
            userId: '1',
            travelId: '2',
            departure: 'Toto',
            destination: 'Toto',
            requiredDocuments: '1234'
        };

        registrationsRepository.findRegisteredUsers.mockResolvedValue(trips);

        const result = await paymentsService.getRegisteredUsers('2')

        expect(result).toEqual(trips);
    });
});