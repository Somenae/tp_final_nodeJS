const documentsService = require('./documentsService');
const registrationsRepository = require('../repositories/registrationsRepository');
const tripsRepository = require('../repositories/tripsRepository');

jest.mock('../repositories/registrationsRepository', () => ({
    findByUser: jest.fn(),
}));

jest.mock('../repositories/tripsRepository', () => ({
    findByPk: jest.fn()
}));

describe('documentsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Test requiredDocuments', async () => {
        const trip = {
            departure: 'Toto',
            destination: 'Toto',
            requiredDocuments: '1234'
        };

        const completeTrip = { id: '1', ...trip }

        tripsRepository.findByPk.mockResolvedValue(completeTrip);

        const result = await documentsService.requiredDocuments('1')

        expect(result).toEqual(trip);
    });

    it('Test getUsersDocuments', async () => {
        const user = {
            id: '1',
            firstname: 'Toto',
            lastname: 'Toto'
        };

        registrationsRepository.findByUser.mockResolvedValue(user);

        const result = await documentsService.getUsersDocuments('1')

        expect(result).toEqual(user);
    });
});