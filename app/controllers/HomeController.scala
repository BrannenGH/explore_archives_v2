package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.twirl.api.Html

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
    val static_title = "Italian Immigrant Stories — The University of Minnesota"
    def index() = Action { implicit request: Request[AnyContent] =>
        Ok(views.html.index.render(static_title))
    }
    def document() = Action { implicit request: Request[AnyContent] =>
        Ok(views.html.documents.render(static_title))
    }
    def about() = Action { implicit request:Request[AnyContent] =>
        Ok(views.html.about.render(static_title))
    }
}
