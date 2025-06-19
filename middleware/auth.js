const usersRepository = require('../repositories/usersRepository');
const jwt = require('jsonwebtoken');

const setUserDatas = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;

        if (!token) {
            res.locals.user = null;
            res.locals.isAuthenticated = false;
            res.locals.isAdmin = false;
            return next();
        };
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await usersRepository.findByPk(decoded.userId);
        
        if (!user) {
            res.locals.user = null;
            res.locals.isAuthenticated = false;
            res.locals.isAdmin = false;
            res.clearCookie("token");
            return next();
        };
        
        res.locals.user = user;
        res.locals.isAuthenticated = true;
        res.locals.isMember = user.roles === 'member';
        res.locals.isAdmin = user.roles === 'admin';

        req.user = user;

        next();
    } catch (error) {
        throw new Error(`Set user datas error: ${error.message}`);
    }
};

const isAuthenticated = (req, res, next) => {
    if (req.user && res.locals.isAuthenticated) {
        return next();
    };
    res.status(401).redirect('/api/auth/login');
};

const isMember = (req, res, next) => {
    if (req.user && res.locals.isMember) {
        return next();
    };
    res.status(401).redirect('/api/auth/login');
};

const isAdmin = (req, res, next) => {
    if (req.user && res.locals.isAdmin) {
        return next();
    };
    res.status(401).redirect('/api/auth/login');
};

const redirectIfAuthenticated = (req, res, next) => {
    if (res.locals.isAuthenticated) {
        return res.redirect('/api/trips');
    };
    next();
};

module.exports = {
    setUserDatas,
    isAdmin,
    isAuthenticated,
    redirectIfAuthenticated,
    isMember,
};