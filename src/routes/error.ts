import * as express from "express";
import * as config from "../config.json";
import * as fs from 'fs';

class RouteManager{
    public router;
    //Sets the static routes for the application
    constructor(root){
        this.router = express.Router;
        this.setroutes(root);
    }
    setroutes(root){
        this.router.get("/",function(req,res){
            res.render('index');
        });
        var staticlist: Array<string> = this.retrieveroutes(root);
        for(var i=0;i<staticlist.length;i++){
            this.router.get("/" + staticlist[i],function(req,res){
                res.send(staticlist[i]);
            });
        }
    }
    //Retrieves all the routes in the root directory's html folder
    retrieveroutes(root: String){
        return fs.readdirSync(root + "/html/");
    }
}