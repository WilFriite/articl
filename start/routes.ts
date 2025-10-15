/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import LoginController from "#controllers/login_controller";
import LogoutController from "#controllers/logout_controller";
import { middleware } from "#start/kernel";

const HomeController = () => import("#controllers/home_controller");
const SignupController = () => import("#controllers/signup_controller");
const EmailVerificationsController = () =>
  import("#controllers/email_verifications_controller");

router.get("/", [HomeController, "index"]).as("home");
router.get("/stream", [HomeController, "stream"]).as("stream");

// Auth

router.get("/signup", [SignupController, "show"]).as("signup.show");
router.post("/signup", [SignupController, "store"]).as("signup.store");

router
  .get("/logout", [LogoutController])
  .as("logout")
  .middleware(middleware.auth());

router
  .get("/login", [LoginController, "show"])
  .as("login.show")
  .middleware(middleware.guest());

// Email verification routes
router
  .get("/verify-email/:token", [EmailVerificationsController, "verify"])
  .as("email.verify")
  .middleware(middleware.auth());
router
  .post("/verify-email/resend", [EmailVerificationsController, "resend"])
  .as("email.resend")
  .middleware(middleware.auth());
