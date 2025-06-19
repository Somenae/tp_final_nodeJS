const jwt = require('jsonwebtoken');
const usersRepository = require('../repositories/usersRepository');
const bcrypt = require('bcrypt');

class authService {
    constructor() {
        this.usersRepository = usersRepository;
    }

    register = async (userDatas) => {
        try {
            if (!userDatas) {
                throw new Error("No datas");
            };

            const { email } = userDatas;
            const existingUser = await this.usersRepository.findOne({ email: email });

            if (existingUser) {
                return false;
            }
            
            const hashedPassword = await bcrypt.hash(userDatas.password, 10);
            userDatas.password = hashedPassword
            
            this.usersRepository.create(userDatas);
            return true;
        } catch (error) {
            return 'Error during process'
        }
    }

    login = async (userDatas, res) => {
        try {
            const { email, password } = userDatas;

            // Check user exists
            const user = await this.usersRepository.findOne({ email: email });

            if (!user) {
                return false;
            }

            // Check password and return if false
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return false;
            }

            // Generate token
            const token = jwt.sign(
                {
                    userId: user._id,
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '24h'
                }
            );
            
            this.generateSecureCookie(token, res);

            return true;

        } catch (error) {
            throw new Error("Error during login : " + error.message);
        }
    }

    generateSecureCookie (token, response) {
        const responseCookie = {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        }

        response.cookie("token", token, responseCookie);
    }

    logout = async (res) => {
        res.clearCookie('token');
    }
}

module.exports = new authService();