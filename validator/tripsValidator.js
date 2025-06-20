const { body, param } = require('express-validator');

// Gérer la validation de l'id 
const validateIdParam = [
    param('id').isMongoId().withMessage('L\'id doit être un objet MongoDB valide'),
];

// Gérer la validation du Body
const validateBody = [
    body('departure')
    .isString()
    .notEmpty()
    .withMessage('Le départ est obligatoire'),
    body('destination')
    .isString()
    .notEmpty()
    .withMessage('La destination est obligatoire'),
];

module.exports = { validateIdParam, validateBody };