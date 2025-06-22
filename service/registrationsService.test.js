const registrationsRepository = require('../repositories/registrationsRepository');
const registrationsService = require('./registrationsService');

jest.mock('../repositories/registrationsRepository', () => ({
    findByUser: jest.fn(),
    findByPk: jest.fn()
}));

describe('registrationService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Test getUserTrips', async () => {
        const trips = {
            userId: '1',
            travelId: '2',
            departure: 'Toto',
            destination: 'Toto',
            requiredDocuments: '1234'
        };

        registrationsRepository.findByUser.mockResolvedValue(trips);

        const result = await registrationsService.getUserTrips('1')

        expect(result).toEqual(trips);
    });

    it('Test registeredUserTrip', async () => {
        const trips = {
            id: '3',
            userId: '1',
            travelId: '2',
            departure: 'Toto',
            destination: 'Toto',
            requiredDocuments: '1234'
        };

        registrationsRepository.findByPk.mockResolvedValue(trips);

        const result = await registrationsService.registeredUserTrip('3')

        expect(result).toEqual('1');
    });
});