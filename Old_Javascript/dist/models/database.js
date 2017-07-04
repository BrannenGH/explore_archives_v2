"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var Database = (function () {
    function Database(config) {
        this.config = config;
        this.connectdb();
    }
    Database.prototype.connectdb = function () {
        mongoose.connect('mongodb://' + config["mongodb"]["location"]);
        this.db = mongoose.connection;
        this.db.on("error", console.error.bind(console, "connection error:"));
        var DocumentSchema = new mongoose.Schema({
            featured: Boolean,
            relevance: Number,
            //fill with JSON object will all paramaters that are public facing, i.e. not internal
            properties: JSON
        });
        this.Document = mongoose.model('Document', DocumentSchema);
        //console.log(this.Document.find(function(err, data){console.log(data);}).sort('odcnumber'));
        //console.log(this.Document.find(function(err, data){console.log(data);}).sort('relevance featured docnumber').
        //limit(10).sort('-relevance -featured -docnumber').
        //limit(10).sort('relevance featured docnumber').lean());//.distinct('_id'));
        mongoose.Promise = bluebird;
    };
    Database.prototype.documentlist = function () {
        var listofdocuments = { "documents": [] };
        this.Document.find(null, null, { sort: 'relevance featured docnumber' }, function (err, files) {
            console.log(this.prototype);
            for (var i = 0; i < files.length; i++) {
                listofdocuments["documents"].push(files[i]["_id"]);
            }
            console.log(listofdocuments);
        });
        return listofdocuments;
    };
    Database.prototype.createdocuments = function (documentid) {
        if (isNaN(documentid)) {
            var currentdocumenthander = [];
            for (var i = 0; i < documentid.legnth; i++) {
                currentdocumenthander.push(new document.DocumentHandler(documentid[i], this.readproperty(documentid[i]), this.readkey(documentid[i])));
            }
            return currentdocumenthander;
        }
        else {
            var currentdocumenthandler = new document.DocumentHandler(documentid, this.readproperty(documentid), this.readkey(documentid));
            return currentdocumenthandler;
        }
    };
    Database.prototype.returnjson = function (err, document) {
        var values;
        if (err)
            return this.handleerror(err);
        values = JSON.parse(document);
        console.log(values);
        return values;
    };
    Database.prototype.readproperty = function (documentid) {
        return this.Document.findOne({ "_id": documentid }, 'property', function (err, document) { this.returnjson(err, document.lean()); });
    };
    Database.prototype.readkey = function (documentid) {
        return this.Document.findOne({ "_id": documentid }, 'archivelocation callnumber docnumber feature date', function (err, document) { this.returnjson(err, document.lean()); });
    };
    Database.prototype.handleerror = function (error) {
        console.log("Error in database: %s", error);
    };
    return Database;
}());
exports.Database = Database;
