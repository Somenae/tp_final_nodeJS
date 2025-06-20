const { body } = require('express-validator');

// validation body
const validateBody = [
    body('lastname')
    .isString()
    .notEmpty()
    .withMessage('Le nom de famille est obligatoire'),
    body('firstname')
    .isString()
    .notEmpty()
    .withMessage('Le prenom est obligatoire'),
    body('email')
    .isEmail()
    .notEmpty()
    .withMessage('Le prix est obligatoire'),
];

module.exports = { validateBody };