package controllers

import javax.inject._
import play.api._
import play.api.mvc._

class ApiController @Inject()(cc: ControllerComponents) extends AbstractController(cc){
    def documentidLookup(documentid:String) = Action{ implicit request: Request[AnyContent] =>
        Ok(documentid)
    }
    def pageLookup(page:String) = Action{ implicit request: Request[AnyContent] =>
        Ok(page)
    }
}
