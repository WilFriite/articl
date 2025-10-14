import type { HttpContext } from "@adonisjs/core/http";
import { DateTime } from "luxon";

export default class MediaController {
  public async upload({ response, request }: HttpContext) {
    const media = request.file("media")!;
    const key = `${media.fileName}-${DateTime.now().toISO()}.${media.extname}`;
    await media.moveToDisk(key);
    return response.ok({ key });
  }
}
