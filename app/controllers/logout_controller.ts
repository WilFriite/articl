import type { HttpContext } from "@adonisjs/core/http";

export default class LogoutController {
  public async handle({ auth, response }: HttpContext) {
    auth.use("web").logout();
    return response.redirect().toRoute("home");
  }
}
