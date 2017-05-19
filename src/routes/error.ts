import * as express from "express";
import * as config from "../config.json";
import * as fs from 'fs';

class RouteManager{
    public router;
    //Sets the static routes for the application
    constructor(){
        this.router = express.Router;
        this.setroutes();
    }
    setroutes(){
        this.router.get("/",function(req,res){
            res.render('index');
        });
        var staticlist: Array<string> = this.retrieveroutes();
        for(var i=0;i<staticlist.length;i++){
            this.router.get("/" + staticlist[i],function(req,res){
                res.send(staticlist[i]);
            });
        }
    }
    //Retrieves all the routes in the root directory's html folder
    retrieveroutes(){
        return fs.readdirSync(config["root"] + "/html/");
    }
}