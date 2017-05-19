"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var apiru = require("../routes/api");
var staticru = require("../routes/static");
var errorru = require("../routes/error");
var database = require("./database");
var config = require("../config.json");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.database = database.Database.start();
        let;
        this.app.database = this.database;
    }
    Server.prototype.config = function () {
        this.app.use(express.static(config["root"] + "/public/"));
        ;
        this.app.set('port', config["port"]);
        if (config["engine"] != "plain") {
            this.app.set('view engine', config["engine"]);
        }
        this.app.set('views', path.join(__dirname, "../../public/html"));
        //allows JSON to be parsed when clients post stringified JSON
        this.app.use(bodyParser.json());
        this.app.listen(this.app.get('port'), function () {
            console.log('App started and listening on port ' + this.app.get("port"));
        });
        this.app.use("/", staticru);
        this.app.use("/error/", errorru);
        this.app.use("/api/", apiru);
    };
    return Server;
}());
exports.Server = Server;
