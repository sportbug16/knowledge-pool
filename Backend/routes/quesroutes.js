const express = require("express");
const router = express.Router();
const {
  getallvisques,
  getspvisques,
  createques,
  getspques,
  getproblem,
  getsolution
} = require("../controllers/quescontroller");
const validatetoken = require("../middleware/accesstokenhandler2");
// Define your routes here, for example:
router.get("/allvis", validatetoken, getallvisques);
router.post("/specvis", validatetoken, getspvisques);

router.get("/spec", validatetoken, getspques);

router.post("/gen", validatetoken, createques);
router.get("/getprob",validatetoken,getproblem)
router.get("/getsol",validatetoken,getsolution)
module.exports = router;