module.exports[
    {}
    {}
]




// Old express configuration
/*
    this.app.get("/apip/:filters",function(req,res){
      var listofdocuments = {"documents":[]}
      req.app.database.Document.find(null,null,{sort: 'properties.machinelocation'},function(err,files){
        for (var i=0;i < files.length; i++){
          if (files[i-1] != undefined && files[i] != undefined && JSON.stringify(files[i-1]["properties"]["machinelocation"]) == JSON.stringify(files[i]["properties"]["machinelocation"])){
            listofdocuments["documents"][listofdocuments["documents"].length-1]["Document"].push(files[i]["_id"]);
          } else {
            var stagedObject = {"Location":files[i]["properties"]["machinelocation"],"Document":[files[i]["_id"]]}
            listofdocuments["documents"].push(stagedObject);
          }
        }
        res.json(listofdocuments);
      });
    });
    this.app.get("/apid/:documentid",function(req,res){
      var documentid = req.params.documentid;
      req.app.database.Document.findOne({"_id": documentid}, null, function (err,document){res.json(document)});
    });
    this.app.use(function (req,res,next){
      res.status(404).render("404");
    });
  }
  */