"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hapi = require("hapi");
var Pug = require("pug");
var Vision = require("vision");
var fs = require("fs");
var Inert = require("inert");
var Path = require("path");
var Server = (function () {
    function Server(config) {
        this.app = new Hapi.Server({ 'connections': { 'routes': { 'files': { relativeTo: Path.join(config["root"]) } } } });
        this.app.connection({ "port": config["port"] });
        console.log("Server being started at port " + config["port"]);
        this.configplugins(config);
        //this.routes(config);
        console.log(this.app.info);
        // Create a new instance of the MongoDB wrapper
        //this.database = new database.Database(config);
        // Attach the mongoDB wrapper to the express function for reference in callbacks
        //this.app.database = this.database;
    }
    Server.prototype.configplugins = function (config) {
        var _this = this;
        this.app.register([Vision, Inert], function (err) {
            if (err) {
                console.error("Could not load plugins");
                process.exit(1);
            }
            _this.app.views({
                'engines': { 'pug': Pug },
                'path': "views",
                'relativeTo': config["root"],
                "allowAbsolutePaths": true
            });
            _this.app.start(function () {
                console.log("Server started at " + config["port"]);
            });
        }, this.app.route(this.configroutes(config, fs.readdirSync(config["root"] + "/views"))));
    };
    Server.prototype.configroutes = function (config, files) {
        var _this = this;
        var routes = [
            { "method": "GET", 'path': "/", handler: function (request, reply) {
                    reply.view("./index.pug");
                }
            }
        ];
        for (var i = 0; i < files.length; i++) {
            this.app.oneroute = files[i];
            routes.push({ "method": 'GET', 'path': "/" + this.app.oneroute.substring(0, this.app.oneroute.indexOf('.')), handler: function (request, reply) {
                    reply.view(['./', _this.app.oneroute].join(''));
                    console.log(_this.app.oneroute + " is being sent because the client requested " + _this.app.oneroute.substring(0, _this.app.oneroute.indexOf('.')));
                }
            });
        }
        routes.push({ "method": 'GET', "path": '/assets/{type}/{document}', "handler": function (request, reply) {
                reply.file(Path.join("./assets/", request.params.type, "/", request.params.document));
            }
        });
        for (var i = 0; i < routes.length; i++) {
            console.log(routes[i]["handler"].toString());
        }
        return routes;
    };
    return Server;
}());
exports.Server = Server;
