const mongoose = require('mongoose');

const connectDB = async (mongoURL) => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB connecté avec succès');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;