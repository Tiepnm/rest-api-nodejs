"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var crmModel_1 = require("../models/crmModel");
var Contact = mongoose.model('Contact', crmModel_1.ContactSchema);
var Transaction = require('mongoose-transactions');
var ContactController = /** @class */ (function () {
    function ContactController() {
    }
    ContactController.prototype.addNewContact = function (req, res) {
        var newContact = new Contact(req.body);
        var transaction = new Transaction();
        transaction.insert('Contact', newContact);
        transaction.run();
        // newContact.save((err, contact) => {
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json(contact);
        // });
        res.json(newContact);
    };
    ContactController.prototype.getContacts = function (req, res) {
        Contact.find({}, function (err, contacts) {
            console.log(contacts);
            if (err) {
                res.send(err);
            }
            contacts = contacts.map(function (contact) {
                var obj = {
                    firstName: contact.firstName,
                    lastName: contact.lastName
                };
                return obj;
            });
            // contacts = contacts.filter(contact => contact.firstName=="b");
            res.json(contacts);
        });
    };
    ContactController.prototype.getContactWithID = function (req, res) {
        Contact.findById(req.params.contactId, function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    };
    ContactController.prototype.updateContact = function (req, res) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { "new": true }, function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    };
    ContactController.prototype.deleteContact = function (req, res) {
        Contact.remove({ _id: req.params.contactId }, function (err, contact) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    };
    return ContactController;
}());
exports.ContactController = ContactController;
