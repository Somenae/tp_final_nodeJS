const authService = require('../service/authService');

class authController {
    constructor() {
        this.authService = authService;
    }

    signup = async (req, res) => {
        try {
            res.render("auth/signup");
        } catch (error) {
            return res.status(500).send("Internal Server Error");
        }
    }

    register = async (req, res) => {
        try {
            const registerSucceed = await this.authService.register(req.body);
            if (!registerSucceed) {
                return res.status(400).redirect('/api/auth/signup');
            }
            return res.redirect('/api/auth/login');
        } catch (error) {
            return res.status(500).send(`error : ${error.message}`)
        }
    }

    login = async (req, res) => {
        try {
            res.render("auth/login")
        } catch (error) {
            return res.status(500).send("Internal Server Error");
        }
    }

    loginIn = async (req, res) => {
        try {
            const logged = await this.authService.login(req.body, res);
            if (logged) {
                return res.redirect("/api/trips");
            }
            return res.redirect('/api/auth/login');
        } catch (error) {
            return res.status(500).send("Internal Server Error");
        }
    }

    logout = async (req, res) => {
        try {
            this.authService.logout(res);
            return res.redirect('/api/trips');
        } catch (error) {
            
        }
    }
}

module.exports = new authController();