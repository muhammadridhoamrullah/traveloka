const { Controller } = require("../controllers/controller");
const router = require("express").Router();

router.post("/register", Controller.register);
router.get("/verify-email", Controller.verifyEmail);

module.exports = {
  router,
};

// Create User
// Verify Email
// Login User
