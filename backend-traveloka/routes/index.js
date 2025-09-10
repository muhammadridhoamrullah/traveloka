const { Controller } = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");
const { errorHandling } = require("../middlewares/errorHandler");
const flightRouter = require("./flightRouter");
const userRouter = require("./userRouter");
const router = require("express").Router();

router.use("/users", userRouter);

// middleware
router.use(authentication);

//
router.use("/flights", flightRouter);

router.use(errorHandling);
module.exports = {
  router,
};

// Create User
// Verify Email
// Login User
