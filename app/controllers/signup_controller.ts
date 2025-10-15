import type { HttpContext } from "@adonisjs/core/http";
import mail from "@adonisjs/mail/services/main";
import { DateTime } from "luxon";
import VerifyEmailNotification from "#mails/verify_email_notification";
import User from "#models/user";
import { signupValidator } from "#validators/signup";

export default class SignupController {
  public async show({ inertia }: HttpContext) {
    return inertia.render("auth/signup");
  }
  public async store({ auth, logger, request, response }: HttpContext) {
    const { file, accept_terms, ...data } =
      await request.validateUsing(signupValidator);
    const avatar: string | null = null;
    if (file) {
      logger.info(file);
      const key = `avatar/${data.username}-avatar-${DateTime.now().toFormat("yyyy-MM-dd-HH-mm-ss")}.${file.extname}`;
      await file.moveToDisk(key);
      logger.info(`Uploaded avatar: ${key}`);
    }
    const verificationToken = User.generateVerificationToken();
    const verificationTokenExpiresAt = DateTime.now().plus({ hours: 1 });
    const newUser = await User.create({
      ...data,
      avatar,
      verificationToken,
      verificationTokenExpiresAt,
    });
    await auth.use("web").login(newUser);

    await mail.sendLater(new VerifyEmailNotification(newUser));

    return response.redirect().toRoute("home");
  }
}
