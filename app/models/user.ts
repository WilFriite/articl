import crypto from "node:crypto";
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import { compose } from "@adonisjs/core/helpers";
import hash from "@adonisjs/core/services/hash";
import { BaseModel, column } from "@adonisjs/lucid/orm";
import type { DateTime } from "luxon";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
  uids: ["email", "username"],
  passwordColumnName: "password",
});

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare username: string;

  @column()
  declare avatar: string | null;

  @column()
  declare email: string;

  @column({ serializeAs: null })
  declare password: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null;

  @column()
  declare verificationToken: string | null;

  @column.dateTime()
  declare verificationTokenExpiresAt: DateTime | null;

  /**
   * Generate a random verification token
   */
  public static generateVerificationToken(): string {
    // return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return crypto.randomBytes(16).toString("hex");
  }

  /**
   * Check if user's email is verified
   */
  public get isEmailVerified(): boolean {
    return this.emailVerifiedAt !== null;
  }
}
