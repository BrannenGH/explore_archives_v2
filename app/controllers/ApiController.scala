package controllers

import javax.inject._
import models._
import org.bson.types.ObjectId
import play.api.mvc._

class ApiController @Inject()(cc: ControllerComponents) extends AbstractController(cc){
  val database:DocumentServer = new DocumentServer
  def documentidLookup(documentid:String) = Action{ implicit request: Request[AnyContent] =>
    Ok(database.create(new ObjectId(documentid)).toString)
  }
  //def pageLookup(page:String) = Action{ implicit request: Request[AnyContent] =>
    //println(database.queryLocation(1)
  //}
}
