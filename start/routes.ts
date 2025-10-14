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

router.get("/", [HomeController, "index"]).as("home");

router.get("/signup", [SignupController, "show"]).as("signup.show");
router.post("/signup", [SignupController, "store"]).as("signup.store");
