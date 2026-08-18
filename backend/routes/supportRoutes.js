const express = require("express");

const {
    sendSupportEmail,
} = require("../controllers/supportController");

const router = express.Router();

router.post("/", sendSupportEmail);

module.exports = router;