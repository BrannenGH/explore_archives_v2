"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Promise = require("bluebird");
Promise.promisifyAll(fs);
/*class RouteManager{
    public routes:Array<JSON>
    //Sets the static routes for the application
    constructor(config){
        this.configureroutes(config[root]+"/html");
    }
    //Retrieves all the routes in the root directory's html folder
    retrieveroutes(htmlroot:String){
        fs.readdirAsync(htmlroot).then(function(data){
            for (var i = 0; i < data.length; i++){
                this.routes.push({"method": 'GET',
                "path": htmlroot + data[i],
                "handler": function(request,reply) {
                    reply(
                }
            }
        }
    //Takes the routes and configures them for module exports

}
*/ 
