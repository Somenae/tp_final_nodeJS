const registrationsService = require('../service/registrationsService');

class registrationsController {
    constructor() {
        this.registrationsService = registrationsService;
    }

    register = async (req, res) => {
        try {
            await this.registrationsService.registerUser(req.user._id, req.params.id);
            return res.redirect(`/api/registrations/me`);
        } catch (error) {
            throw new Error(`Erreur durant l'inscription: ${error.message}`);
        }
    }

    myTrips = async (req, res) => {
        try {
            const userRegistration = await this.registrationsService.getUserTrips(req.user._id);
            return res.render('registrations/list', { userRegistration: userRegistration });
        } catch (error) {
            throw new Error(`Erreur durant l'affichage des voyages de l'utilisateur: ${error.message}`);
        }
    }

    removeRegistration = async (req, res) => {
        try {
            const registrationId = req.params.id;
            const registrationUserId = await this.registrationsService.registeredUserTrip(registrationId);
            
            if (req.user._id != registrationUserId) {
                return res.redirect(`/api/registrations/me`);
            };

            await this.registrationsService.deleteRegistration(registrationId);
            return res.redirect(`/api/registrations/me`);
        } catch (error) {
            throw new Error(`Erreur durant la désinscription: ${error.message}`);
        }
    }

    seeRegistrations = async (req, res) => {
        const tripId = req.params.id;
        const registeredUsers = await this.registrationsService.getRegisteredUsers(tripId);
        return res.render("registrations/adminList", { registeredUsers: registeredUsers });
    }
};

module.exports = new registrationsController();