const paymentsService = require('../service/paymentsService');

class paymentsController {
    constructor() {
        this.paymentsService = paymentsService;
    }

    seePayments = async (req, res) => {
        try {
            const userTrips = await this.paymentsService.getUserPayments(req.user._id.toString());
            return res.render('payments/list', { userTrips: userTrips });
        } catch (error) {
            throw new Error(`Error during user's payments display: ${error.message}`);
        }
    }

    userPayment = async (req, res) => {
        try {
            await this.paymentsService.userPayment(req.params.id);
            
            return res.redirect('/api/payments/me');
        } catch (error) {
            throw new Error(`Error during user's payment: ${error.message}`);
        }
    }

    seeTripPayments = async (req, res) => {
        try {
            const tripId = req.params.id;
            const registeredUsers = await this.paymentsService.getRegisteredUsers(tripId);
            return res.render('payments/adminList', { registeredUsers: registeredUsers });
        } catch (error) {
            throw new Error(`Error retrieving users payment: ${error.message}`);
        }
    }
};

module.exports = new paymentsController();