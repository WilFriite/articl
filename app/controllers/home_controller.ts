import type { HttpContext } from "@adonisjs/core/http";
import drive from "@adonisjs/drive/services/main";
import mail from "@adonisjs/mail/services/main";
import WelcomeNotification from "#mails/welcome_notification";
import User from "#models/user";

export default class HomeController {
  public async index({ auth, inertia, logger }: HttpContext) {
    const usersCount = await User.query().select("id");

    const isAuthenticated = await auth.check();

    if (isAuthenticated) {
      logger.info(`Sending welcome email to ${auth.user!.email}`);
      await mail.send(new WelcomeNotification(auth.user!));
    }

    logger.info(`Users count: ${usersCount.length}`);
    logger.info(`isAuthenticated: ${isAuthenticated}`);
    logger.info(`auth.isAuthenticated: ${auth.isAuthenticated}`);
    return inertia.render("home");
  }
  public async stream({ inertia }: HttpContext) {
    const url = await drive
      .use("s3")
      .getSignedUrl("190830_0941_720P_4000K_91110481.mp4");
    return inertia.render("stream", {
      url,
    });
  }
}
