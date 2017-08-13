package services 

import javax.inject._
import com.mongodb.casbah.Imports._
import salat._
import salat.dao._

class MongoServer()

object MongoServer{
    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("explore_archives")
    val documents = db("documents")
    def queryLocation(location:Int) = {
        this.documents.findOne(MongoDBObject("relevance"->location))
    }
}