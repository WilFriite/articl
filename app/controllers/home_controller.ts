import type { HttpContext } from "@adonisjs/core/http";
import User from "#models/user";

export default class HomeController {
  public async index({ inertia, logger }: HttpContext) {
    const usersCount = await User.query().select("id");

    logger.info(`Users count: ${usersCount.length}`);
    return inertia.render("home");
  }
}
