const usersService = require('../service/usersService');

class usersController {
    constructor() {
        this.usersService = usersService;
    }

    seeProfile = async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.redirect('/api/auth/login');
            };

            res.render('users/profile', { user: user });
        } catch (error) {
            throw new Error(`Error when displaying profile: ${error.message}`);
            
        }
    }

    updateProfile = async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.redirect('/api/auth/login');
            };

            await this.usersService.updateUser(user, req.body);
            res.redirect('/api/user/profile');
        } catch (error) {
            throw new Error(`Error when updating profile: ${error.message}`);
            
        }
    }
}

module.exports = new usersController();