/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";

const HomeController = () => import("#controllers/home_controller");
const SignupController = () => import("#controllers/signup_controller");
const EmailVerificationsController = () =>
  import("#controllers/email_verifications_controller");

router.get("/", [HomeController, "index"]).as("home");
router.get("/stream", [HomeController, "stream"]).as("stream");

router.get("/signup", [SignupController, "show"]).as("signup.show");
router.post("/signup", [SignupController, "store"]).as("signup.store");

// Email verification routes
router
  .get("/verify-email/:token", [EmailVerificationsController, "verify"])
  .as("email.verify");
router
  .post("/verify-email/resend", [EmailVerificationsController, "resend"])
  .as("email.resend");
