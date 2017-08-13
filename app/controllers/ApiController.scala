package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import services.MongoServer

class ApiController @Inject()(cc: ControllerComponents) extends AbstractController(cc){
    val database = MongoServer
    def documentidLookup(documentid:String) = Action{ implicit request: Request[AnyContent] =>
        Ok(documentid)
    }
    def pageLookup(page:String) = Action{ implicit request: Request[AnyContent] =>
        println(database.queryLocation(1))
        //Ok(database.queryLocation(1))
    }
}
