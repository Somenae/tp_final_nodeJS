const { body } = require('express-validator');

// validation body signup
const validateSignup = [
    body('firstname')
    .isString()
    .notEmpty()
    .withMessage('Le prenom est obligatoire'),
    body('lastname')
    .isString()
    .notEmpty()
    .withMessage('Le nom de famille est obligatoire'),
    body('email')
    .isEmail()
    .notEmpty()
    .withMessage('L\'email est obligatoire'),
    body('password')
    .isStrongPassword( {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    })
    .withMessage('Le mot de passe doit contenir 1 majuscule, 1 minuscule, 1 chiffre et contenir un minimum de 6 caractères')
    .notEmpty()
    .withMessage('Le mot de passe est obligatoire'),
];

// validation body login
const validateLogin = [
    body('email')
    .isEmail()
    .withMessage('Renseignez un email valide')
    .notEmpty()
    .withMessage('L\'email est obligatoire'),
    body('password')
    .isString()
    .withMessage('Renseignez un mot de passe valide')
    .notEmpty()
    .withMessage('Le mot de passe est obligatoire'),
]

module.exports = { validateSignup, validateLogin };