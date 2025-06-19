const registrationsRepository = require('../repositories/registrationsRepository');

class paymentsService {
    constructor() {
        this.registrationsRepository = registrationsRepository;
    }

    getUserPayments = async (userId) => {
        try {
            const userTrips = await this.registrationsRepository.findByUser(userId);
            return userTrips;
        } catch (error) {
            throw new Error(`Error retrieving user's payments: ${error.message}`);
        }
    }

    userPayment = async (registrationId) => {
        await this.registrationsRepository.update(registrationId, { paymentStatus: 'completed' });
    }

    getRegisteredUsers = async (tripId) => {
        try {
            const registeredUser = await this.registrationsRepository.findRegisteredUsers(tripId);
            return registeredUser;
        } catch (error) {
            throw new Error(`Error when trying to get registered users: ${error.message}`);
        }
    }
}

module.exports = new paymentsService();