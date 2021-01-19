const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const fs = require('fs');
const path = require('path');
const basePath = path.dirname(require.resolve('../..'));

const routes = express.Router();

const authFilePath = path.resolve(basePath, 'data', 'users.json');
let authFile;
let authData;

try {
    authFile = fs.readFileSync(authFilePath, 'utf-8');
    authData = JSON.parse(authFile);
} catch (e) {
    authFile = null;
    authData = null;
}

passport.use(new BasicStrategy(
    (username, password, done) => {
        if (!authData) {
            return done(null, {});
        }

        const user = authData[username];

        if (!user || (user.password !== password)) {
            console.error('Login failure', { username })
            return done(null, false);
        }

        return done(null, user);
    }
));


module.exports = routes;