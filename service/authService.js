const usersRepository = require('../repositories/usersRepository');

class authService {
    constructor() {
        this.usersRepository = usersRepository;
    }


}

module.exports = new authService();