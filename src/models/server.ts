import * as express from 'express';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as apiru from '../routes/api';
import * as staticru from '../routes/static';
import * as errorru from '../routes/error'; 
import * as database from "./database";
import * as config from "../config.json";

export class Server{
    public app : express.Application;
    public database : database.Database;

    constructor() {
        this.app = express();
        this.config();
        this.database = database.Database.start();
        let this.app.database = this.database;
    }
    public config() {
        this.app.use(express.static(config["root"]+"/public/")));
        this.app.set('port', config["port"]);
        if (config["engine"] != "plain") {
            this.app.set('view engine', config["engine"]);
        }
        this.app.set('views', path.join(__dirname,"../../public/html"));

        //allows JSON to be parsed when clients post stringified JSON
        this.app.use(bodyParser.json());

        this.app.listen(this.app.get('port'), function() {
            console.log('App started and listening on port ' + this.app.get("port"));
        });
        this.app.use("/",staticru);
        this.app.use("/error/",errorru);
        this.app.use("/api/",apiru);
    }