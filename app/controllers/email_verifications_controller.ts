import type { HttpContext } from "@adonisjs/core/http";
import mail from "@adonisjs/mail/services/main";
import { DateTime } from "luxon";
import VerifyEmailNotification from "#mails/verify_email_notification";
import WelcomeNotification from "#mails/welcome_notification";
import User from "#models/user";

export default class EmailVerificationsController {
  /**
   * Verify email with token
   */
  public async verify({ params, response, session }: HttpContext) {
    const { token } = params;

    const user = await User.findBy("verification_token", token);

    if (!user) {
      session.flash("error", "Invalid verification token");
      return response.redirect().toRoute("home");
    }

    // Check if token is expired using verificationTokenExpiresAt
    if (
      !user.verificationTokenExpiresAt ||
      DateTime.now() > user.verificationTokenExpiresAt
    ) {
      session.flash("error", "Verification link has expired");
      return response.redirect().toRoute("home");
    }

    // Mark email as verified
    user.emailVerifiedAt = DateTime.now();
    user.verificationToken = null;
    const updated = await user
      .merge({
        verificationToken: null,
        verificationTokenExpiresAt: null,
      })
      .save();

    await mail.sendLater(new WelcomeNotification(updated));

    session.flash("success", "Email verified successfully!");
    return response.redirect().toRoute("home");
  }

  /**
   * Resend verification email
   */
  public async resend({ auth, response, session }: HttpContext) {
    const user = auth.user!;

    if (user.isEmailVerified) {
      session.flash("info", "Email is already verified");
      return response.redirect().back();
    }

    // Generate new token and extend expiry by 1 hour
    user.verificationToken = User.generateVerificationToken();
    const updated = await user
      .merge({
        verificationTokenExpiresAt: user.verificationTokenExpiresAt,
      })
      .save();

    // Send verification email
    await mail.send(new VerifyEmailNotification(updated));

    session.flash("success", "Verification email sent!");
    return response.redirect().back();
  }
}
