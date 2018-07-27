"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var crmRoutes_1 = require("./routes/crmRoutes");
var mongoose = require("mongoose");
var App = /** @class */ (function () {
    //  public mongoUrl: string = 'mongodb://tiep:ngmanhtiep1@ds239911.mlab.com:39911/crmdb';
    function App() {
        this.routePrv = new crmRoutes_1.Routes();
        this.mongoUrl = 'mongodb://localhost/CRMdb';
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    App.prototype.config = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        // this.app.use(express.static('public'));
        this.app.use(express.static('public/.well-known/acme-challenge'));
    };
    App.prototype.mongoSetup = function () {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    };
    return App;
}());
exports["default"] = new App().app;
