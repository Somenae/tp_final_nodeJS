const { param } = require('express-validator');

// validation id 
const validateIdParam = [
    param('id').isMongoId().withMessage('L\'id doit être un objet MongoDB valide'),
];

module.exports = { validateIdParam };