import { defineConfig, transports } from "@adonisjs/mail";
import env from "#start/env";

const mailConfig = defineConfig({
  default: "resend",

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or same transport with different
   * options.
   */
  mailers: {
    smtp: transports.smtp({
      host: env.get("SMTP_HOST"),
      port: env.get("SMTP_PORT"),
      /**
       * Uncomment the auth block if your SMTP
       * server needs authentication
       */
      /* auth: {
        type: 'login',
        user: env.get('SMTP_USERNAME'),
        pass: env.get('SMTP_PASSWORD'),
      }, */
    }),
    resend: transports.resend({
      baseUrl: "https://api.resend.com",
      key: env.get("RESEND_API_KEY"),
      tags: [
        {
          name: "category",
          value: "confirm_email",
        },
      ],
    }),
  },
});

export default mailConfig;

declare module "@adonisjs/mail/types" {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
