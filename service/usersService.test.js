const usersRepository = require('../repositories/usersRepository');

jest.mock('../repositories/usersRepository', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn()
}));

describe('usersService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Nothing in user service to be tested for now...
    it('Test updateUser', async () => {
        /* const trips = {
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

        expect(result).toEqual(trips); */
    });
});