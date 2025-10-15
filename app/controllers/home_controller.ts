import type { HttpContext } from "@adonisjs/core/http";
import drive from "@adonisjs/drive/services/main";
import db from "@adonisjs/lucid/services/db";
import User from "#models/user";

export default class HomeController {
  public async index({ auth, inertia, logger }: HttpContext) {
    const usersCount = await User.query().select("id");

    const isAuthenticated = await auth.check();

    logger.info(`Users count: ${usersCount.length}`);
    logger.info(`isAuthenticated: ${isAuthenticated}`);
    logger.info(`auth.isAuthenticated: ${auth.isAuthenticated}`);
    return inertia.render("home", {
      ssl: db.config.connections["postgres"].connection.ssl as boolean,
    });
  }
  public async stream({ inertia, logger }: HttpContext) {
    const url = await drive
      .use("s3")
      .getSignedUrl("190830_0941_720P_4000K_91110481.mp4");
    return inertia.render("stream", {
      url,
    });
  }
}
