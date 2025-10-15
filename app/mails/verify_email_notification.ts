import { BaseMail } from "@adonisjs/mail";
import type User from "#models/user";
import env from "#start/env";

export default class VerifyEmailNotification extends BaseMail {
  from = "Articl. <no-reply@wilfrite.com>";
  subject = "Verify your email address";

  public constructor(public user: User) {
    super();
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    const verificationUrl = `http://${env.get("HOST")}:${env.get("PORT")}/verify-email/${this.user.verificationToken}`;
    this.message.to(this.user.email).htmlView("emails/verify_email", {
      user: this.user,
      verificationUrl,
    });
  }
}
