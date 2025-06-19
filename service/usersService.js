const usersRepository = require('../repositories/usersRepository');

class UsersService {
    constructor() {
        this.usersRepository = usersRepository;
    }

    updateUser = async (user, datas) => {
        this.usersRepository.update(user.id, datas);
    }
}

module.exports = new UsersService();