const registrationsRepository = require('../repositories/registrationsRepository');

class registrationsService {
    constructor() {
        this.registrationsRepository = registrationsRepository;
    }

    // Register current user for a trip
    registerUser = async (userId, travelId) => {
        try {
            this.registrationsRepository.create({ userId: userId, travel: travelId })
        } catch (error) {
            throw new Error(`Error during user's registration to the trip: ${error.message}`);
        }
    }

    // Get all trips for one user, and returns it
    getUserTrips = async (userId) => {
        try {
            const registrations = await this.registrationsRepository.findByUser(userId);
            return registrations;
        } catch (error) {
            throw new Error(`Error when trying to get user's trips: ${error.message}`);
        }
    }

    // Delete registration passed on parameter
    deleteRegistration = async (registrationId) => {
        try {
            await this.registrationsRepository.delete({ _id: registrationId })
        } catch (error) {
            throw new Error(`Error when trying to remove registration: ${error.message}`);
        }
    }

    // Get a list of registered user for a specific trip
    getRegisteredUsers = async (travelId) => {
        try {
            const registeredUser = await this.registrationsRepository.findRegisteredUsers(travelId);
            return registeredUser;
        } catch (error) {
            throw new Error(`Error when trying to get registered users: ${error.message}`);
        }
    }

    // Returns specific user registered on specific trip
    registeredUserTrip = async (registrationId) => {
        try {
            const registration = await this.registrationsRepository.findByPk(registrationId);
            const registrationUserId = registration.userId.toString();
            return registrationUserId;
        } catch (error) {
            throw new Error(`Error when trying to get registered user from trip: ${error.message}`);
        }
    }
};

module.exports = new registrationsService();