var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    email: String,
    username: String,
    password: String,

    facebook: {
        id: String,
        token: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        name: String
    },
    auto: Boolean

}, {
    collection: 'OauthUser',
    versionKey: false
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('OauthUser', userSchema);
