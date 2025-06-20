const { validationResult } = require('express-validator');

// Crée la fonction de validation 

const validate = (req, res, next) => {
    // Définir un tableau d'erreurs
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Permet de retourner la liste d'erreurs à ma requete
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = validate;