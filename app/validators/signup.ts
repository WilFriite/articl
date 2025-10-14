import vine from "@vinejs/vine";

export const signupValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).trim().toLowerCase().unique({
      table: "users",
      column: "username",
      caseInsensitive: true,
    }),
    email: vine.string().email().trim().unique({
      table: "users",
      column: "email",
      caseInsensitive: true,
    }),
    password: vine.string().minLength(6).trim(),
    file: vine
      .file({
        extnames: ["png", "jpg"],
        size: 1024 * 1024 * 5,
      })
      .optional(),
    accept_terms: vine.literal(true),
  }),
);
