const express = require("express");

const {
    registerUser,
    loginUser,
    updateProfile,
} = require("../controllers/authController");

const auth = require("../middleware/auth");

const upload = require("../middleware/upload");


const router = express.Router();


// =====================================================
// REGISTER
// =====================================================

router.post(
    "/register",
    registerUser
);


// =====================================================
// LOGIN
// =====================================================

router.post(
    "/login",
    loginUser
);


// =====================================================
// UPDATE PROFILE
// =====================================================

router.put(
    "/profile",
    auth,
    upload.profileUpload.single(
        "profileImage"
    ),
    updateProfile
);


module.exports = router;