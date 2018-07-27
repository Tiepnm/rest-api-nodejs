import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import * as config from 'config'

 class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = '';
     private oauthserver = require('oauth2-server')
   //  public mongoUrl: string = 'mongodb://tiep:ngmanhtiep1@ds239911.mlab.com:39911/crmdb';

    constructor() {

        var dbConfig = config.get('Customer.dbConfig');
        console.log(dbConfig.host)
        this.mongoUrl = dbConfig.mongoUrl;
        console.log(this.mongoUrl)
        this.app = express();


        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        var oauth = this.oauthserver({
            model: require('./models/auth.js'),
            grants: ['password','refresh_token'],
            debug: true
        });
        this.app.all('/oauth/token', oauth.grant());

        this.app.use(oauth.authorise());
        // this.app.get('/', this.app.oauth.authorise(), function (req, res) {
        //     res.send('Congratulations, you are in a secret area!');
        // });
        this.app.use(oauth.errorHandler());
        // serving static files
       // this.app.use(express.static('public'));
        this.app.use(express.static('public/.well-known/acme-challenge'))
        this.app.get('/oauth/authorise', function (req, res, next) {
           // console.log(req.oauth.bearerToken)
        })
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);

    }

}

export default new App().app;