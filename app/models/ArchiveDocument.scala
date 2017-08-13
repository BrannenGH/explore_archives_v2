package models

import com.mongodb.casbah.Imports._
import play.api.libs.json._

class ArchiveDocument(id:Int){
  def setId(id:Int) = {this.id = id}
  def query() = {
    try{
      docserve.find(MongoDBObject("_id" -> this.id))
    } catch{
      e => println("PUT DEBUG STUFF FOR WHEN DOCUMENT IS NOT DEFINED YET")
    }
  }
  def getAttributes():List[DBObject] = this.attributes
  def create() = this.docserve.create(this.getAttributes())
  def update() = this.docserve.read(this.id)
}
object ArchiveDocument{
  def main(args:Array[string]){
    ServerInfo:JsValue = Json.parse(
      """
        |"address":"mongodb://localhost:27017",
        |"database":"test",
        |"collection":"test"
      """.stripMargin
    )
    val document_collection = MongoClient(MongoClientURI(ServerInfo \ "address"))(ServerInfo \ "database")(ServerInfo \ "collection")
    def read(query:DBObject) = this.document_collection.findOne("_id" -> id)
  }
}