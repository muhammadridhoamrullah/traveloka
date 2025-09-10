const { FlightController } = require("../controllers/flightController");

const router = require("express").Router();
router.get("/test", FlightController.test);

module.exports = router
