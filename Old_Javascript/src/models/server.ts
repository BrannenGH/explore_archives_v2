import * as Hapi from 'hapi';
import * as Pug from 'pug';
import * as database from "./database";
import * as Vision from 'vision';
import * as fs from "fs";
import * as Inert from "inert";
import * as Path from "path";

export class Server{
    public app : Hapi.Server;
    //database : database.Database;
    //Not used, in case middlewear to roll server options into is used
    options : Hapi.ServerOptions;

    constructor(config) {
        this.app = new Hapi.Server({'connections':{'routes':{'files':{relativeTo: Path.join(config["root"])}}}});
        this.app.connection({"port":config["port"]});
        console.log("Server being started at port " + config["port"]);
        this.configplugins(config);
        //this.routes(config);
        console.log(this.app.info);
        // Create a new instance of the MongoDB wrapper
       //this.database = new database.Database(config);
        // Attach the mongoDB wrapper to the express function for reference in callbacks
        //this.app.database = this.database;
    }
    configplugins(config) {
        this.app.register([Vision,Inert], (err) =>{
            if (err){
                console.error("Could not load plugins");
                process.exit(1);
            }
            this.app.views({
                 'engines':{'pug' : Pug},
                 'path':  "views",
                 'relativeTo':config["root"],
                 "allowAbsolutePaths":true
                });
            this.app.start(() => {
                console.log("Server started at " + config["port"]);
            }
        }
                this.app.route(this.configroutes(config,fs.readdirSync(config["root"]+"/views")));
    }
    configroutes(config: JSON,files : Array<String>) : Array<Hapi.RouteConfiguration>{
        var routes: Array<Hapi.RouteConfiguration> =[
            {"method":"GET", 'path': "/",handler: (request,reply) =>
                {
                    reply.view("./index.pug");
                }
            }
        ]
        for(var i=0; i < files.length; i++){
            this.app.oneroute = files[i];
            routes.push({ "method": 'GET', 'path': "/" + this.app.oneroute.substring(0, this.app.oneroute.indexOf('.')), handler: (request, reply) =>
                {
                    reply.view(['./',this.app.oneroute].join(''));
                    console.log(this.app.oneroute + " is being sent because the client requested " + this.app.oneroute.substring(0, this.app.oneroute.indexOf('.')));
                }
            });
        }
        routes.push({"method": 'GET',"path": '/assets/{type}/{document}',"handler": (request,reply) => 
            {
                        reply.file(Path.join("./assets/",request.params.type,"/",request.params.document));
            }
        });
        for (var i =0; i<routes.length;i++){
                console.log(routes[i]["handler"].toString());
        }
        return routes;
    }
}