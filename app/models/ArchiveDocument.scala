package models

import com.mongodb.casbah.Imports._

class ArchiveDocument(mongoDoc:DBObject){
  override def toString: String = mongoDoc.toString()
}
