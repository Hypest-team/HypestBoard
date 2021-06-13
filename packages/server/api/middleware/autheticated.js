const passport = require('passport');

module.exports = ({ skipAuth }) => {
    if (!skipAuth) {
        return passport.authenticate('basic', { session: false });
    } else {
        return (req, res, next) => next();
    }
};