import { BaseMail } from "@adonisjs/mail";
import type User from "#models/user";

export default class WelcomeNotification extends BaseMail {
  from = "Articl. <welcome@wilfrite.com>";
  subject = "Welcome to Articl.";

  public constructor(public user: User) {
    super();
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message.to(this.user.email).htmlView("emails/welcome", {
      user: this.user,
    });
  }
}
