const tripsRepository = require('../repositories/tripsRepository');
const tripsService = require('./tripsService');

jest.mock('../repositories/tripsRepository', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn()
}));

describe('tripsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Test getUserTrips', async () => {
        const trips = {
            departureDateTime: '25/02/2025',
            arrivalDateTime: '26/02/2025',
            departure: 'Lyon',
            destination: 'Marseille',
            price: '25',
            status: 'available',
            places: 10,
            requiredDocuments: [{
                title: 'Visa',
                description: 'Un visa'
            }]
        };

        tripsRepository.findAll.mockResolvedValue(trips);

        const result = await tripsService.getAllTrips();

        expect(result).toEqual(trips);
    });

    it('Test getTripById', async () => {
        const trips = {
            id: '1',
            departureDateTime: '25/02/2025',
            arrivalDateTime: '26/02/2025',
            departure: 'Lyon',
            destination: 'Marseille',
            price: '25',
            status: 'available',
            places: 10,
            requiredDocuments: [{
                title: 'Visa',
                description: 'Un visa'
            }]
        };

        tripsRepository.findByPk.mockResolvedValue(trips);

        const result = await tripsService.getTripById('1');

        expect(result).toEqual(trips);
    });
});