const { body, param } = require('express-validator');

// validation id 
const validateIdParam = [
    param('id').isMongoId().withMessage('L\'id doit être un objet MongoDB valide'),
];

// validation body
const validateBody = [
    body('departure')
    .isString()
    .notEmpty()
    .withMessage('Le départ est obligatoire'),
    body('destination')
    .isString()
    .notEmpty()
    .withMessage('La destination est obligatoire'),
    body('price')
    .isString()
    .notEmpty()
    .withMessage('Le prix est obligatoire'),
    body('places')
    .isNumeric()
    .notEmpty()
    .withMessage('Le prix est obligatoire'),
];

module.exports = { validateIdParam, validateBody };