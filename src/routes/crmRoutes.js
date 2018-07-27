"use strict";
exports.__esModule = true;
var crmController_1 = require("../controllers/crmController");
var Routes = /** @class */ (function () {
    function Routes() {
        this.contactController = new crmController_1.ContactController();
    }
    Routes.prototype.routes = function (app) {
        app.route('/')
            .get(function (req, res) {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        // Contact 
        app.route('/contact')
            .get(function (req, res, next) {
            // middleware
            console.log("Request from: " + req.originalUrl);
            console.log("Request type: " + req.method);
            next();
            // if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
            //     res.status(401).send('You shall not pass!');
            // } else {
            //     next();
            // }
        }, this.contactController.getContacts)
            // POST endpoint
            .post(this.contactController.addNewContact);
        // Contact detail
        app.route('/contact/:contactId')
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)["delete"](this.contactController.deleteContact);
    };
    return Routes;
}());
exports.Routes = Routes;
