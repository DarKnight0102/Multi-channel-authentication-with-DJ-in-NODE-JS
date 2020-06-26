var OauthUser = require('../app/models/OauthUser');
var User = require('../app/models/User');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        OauthUser.findById(id, function (err, user) {
            done(err, user);
        });
    });

    require('./localConfig')(passport);
    require('./signupConfig')(passport);
    require('./facebookConfig')(passport);
    require('./googleConfig')(passport);
};
