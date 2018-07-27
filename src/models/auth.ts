import {Client} from "./client";
import {Token} from "./token";
import {User} from "./user";
import {RefreshToken} from "./reresh_token";
var mongoose = require('mongoose');

/**
 * Configuration.
 */

var clientModel = mongoose.model('clientModel', Client);
var tokenModel = mongoose.model('tokenModel', Token);
var userModel = mongoose.model('userModel', User);
var refreshModel = mongoose.model('refreshModel', RefreshToken);

/**
 * Add example client and user to the database (for debug).
 */

// var loadExampleData = function() {
//
//     var client = new clientModel({
//         clientId: 'application',
//         clientSecret: 'secret'
//     });
//
//     var user = new userModel({
//         id: '123',
//         username: 'pedroetb',
//         password: 'password'
//     });
//
//     client.save(function(err, client) {
//
//         if (err) {
//             return console.error(err);
//         }
//         console.log('Created client', client);
//     });
//
//     user.save(function(err, user) {
//
//         if (err) {
//             return console.error(err);
//         }
//         console.log('Created user', user);
//     });
// };

/**
 * Dump the database content (for debug).
 */

var dump = function () {

    clientModel.find(function (err, clients) {

        if (err) {
            return console.error(err);
        }
        console.log('clients', clients);
    });

    tokenModel.find(function (err, tokens) {

        if (err) {
            return console.error(err);
        }
        console.log('tokens', tokens);
    });

    userModel.find(function (err, users) {

        if (err) {
            return console.error(err);
        }
        console.log('users', users);
    });
};

/*
 * Get access token.
 */

var getAccessToken = function (bearerToken, callback) {

    tokenModel.findOne({
        accessToken: bearerToken
    }, callback);
};
var getRefreshToken = function (refreshToken, callback) {

    refreshModel.findOne({
        refreshToken: refreshToken
    }, callback);
};

/**
 * Get client.
 */

var getClient = function (clientId, clientSecret, callback) {

    clientModel.findOne({
        clientId: clientId,
        clientSecret: clientSecret
    }, callback);
};

/**
 * Grant type allowed.
 */

var grantTypeAllowed = function (clientId, grantType, callback) {

    callback(false, grantType === "password" || grantType ==='refresh_token');
};

/**
 * Save token.
 */

var saveAccessToken = function (accessToken, clientId, expires, user, callback) {

    var token = new tokenModel({
        accessToken: accessToken,
        expires: expires,
        clientId: clientId,
        user: user
    });

    token.save(callback);
};
var saveRefreshToken = function (token, clientId, expires, user, callback) {


    var refreshToken = new refreshModel({
        refreshToken: token,
        clientId: clientId,
        user: user,
        expires: expires
    });

    refreshToken.save(callback);
};
/*
 * Get user.
 */

var getUser = function (username, password, callback) {

    userModel.findOne({
        username: username,
        password: password
    }, callback);
};

/**
 * Export model definition object.
 */

module.exports = {
    getAccessToken: getAccessToken,
    getClient: getClient,
    grantTypeAllowed: grantTypeAllowed,
    saveAccessToken: saveAccessToken,
    getUser: getUser,
    getRefreshToken: getRefreshToken,
    saveRefreshToken: saveRefreshToken,
};