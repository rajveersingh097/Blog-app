const express = require("express");
const { loginAdmin } = require("../controller/adminController");
const router = express.Router();
router.post("/login", loginAdmin);
module.exports = router;