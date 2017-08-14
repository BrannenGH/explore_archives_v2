package models

import com.mongodb.casbah.Imports._
import play.api.libs.json.{JsValue, Json}
import org.bson.types.ObjectId

class DocumentServer() {
  var documentList:List[ArchiveDocument] = List()
  private val ServerInfo:JsValue = Json.parse(
    """
      |{"address":"mongodb://localhost:27017",
      |"database":"test",
      |"collection":"test"}
    """.stripMargin
  )
  private val document_collection = MongoClient(MongoClientURI((ServerInfo \ "address").as[String]))((ServerInfo \ "database").as[String])((ServerInfo \ "collection").as[String])
  def create(id:ObjectId): ArchiveDocument = {
    new ArchiveDocument(document_collection.findOneByID(id) get)
  }
}
