import type { HttpContext } from "@adonisjs/core/http";
import { DateTime } from "luxon";
import User from "#models/user";
import { signupValidator } from "#validators/signup";

export default class SignupController {
  public async show({ inertia }: HttpContext) {
    return inertia.render("auth/signup");
  }
  public async store({ logger, request, response }: HttpContext) {
    const data = await request.validateUsing(signupValidator);
    let avatar: string | null = null;
    const media = data.file;
    if (media) {
      logger.info(media);
      const key = `avatar/${data.username}-avatar-${DateTime.now().toFormat("yyyy-MM-dd-HH-mm-ss")}.${media.extname}`;
      await media.moveToDisk(key);
      avatar = key;
      logger.info(`Uploaded avatar: ${key}`);
    }
    const { file, accept_terms, ...rest } = data;
    await User.create({
      ...rest,
      avatar,
    });
    return response.redirect().toRoute("home");
  }
}
