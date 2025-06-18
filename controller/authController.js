const authService = require('../service/authService');

class authController {
    constructor() {
        this.authService = authService;
    }
}

module.exports = new authController();