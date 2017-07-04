import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

export class Database {
  public db : mongoose.connection;
  public Document: mongoose.model;

  constructor(private config) {
    this.connectdb();
  }

  public connectdb(){
    mongoose.connect('mongodb://'+config["mongodb"]["location"]);
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
  }

  public documentlist(){
    var listofdocuments = {"documents": []}
    this.Document.find(null,null,{sort: 'relevance featured docnumber'},function(err,files){
      console.log(this.prototype);
      for (var i=0;i < files.length; i++){
        listofdocuments["documents"].push(files[i]["_id"]);
      }
      console.log(listofdocuments);
    });
    return listofdocuments;
  }

  public createdocuments(documentid){
    if (isNaN(documentid)){
      var currentdocumenthander = [];
      for (var i = 0; i < documentid.legnth; i++){
        currentdocumenthander.push(new document.DocumentHandler(documentid[i], this.readproperty(documentid[i]), this.readkey(documentid[i])));
      }
      return currentdocumenthander;
    }else{
      var currentdocumenthandler = new document.DocumentHandler(documentid, this.readproperty(documentid), this.readkey(documentid));
      return currentdocumenthandler;
    }
  }
  returnjson(err,document){
    var values: JSON;
    if (err) return this.handleerror(err);
    values = JSON.parse(document);
    console.log(values);
    return values;
  }
  readproperty(documentid){
    return this.Document.findOne({"_id": documentid}, 'property', function (err,document){this.returnjson(err,document.lean())});
  }
  readkey(documentid){
    return this.Document.findOne({"_id": documentid}, 'archivelocation callnumber docnumber feature date', function (err,document){this.returnjson(err,document.lean())});
  }
  public handleerror(error){
    console.log("Error in database: %s", error);
  }
}



