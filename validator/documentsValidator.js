const { body, param } = require('express-validator');

// validation id 
const validateIdParam = [
    param('id').isMongoId().withMessage('L\'id doit être un objet MongoDB valide'),
];

// validation body add documents
const validateAddBody = [
    body('title')
    .isString()
    .notEmpty()
    .withMessage('Le titre est obligatoire'),
    body('description')
    .optional()
    .isString()
    .withMessage('La description doit etre une chaine de caractere'),
];

module.exports = { validateIdParam, validateAddBody };