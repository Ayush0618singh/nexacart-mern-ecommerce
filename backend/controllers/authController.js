const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

//Register User
const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const{name, email, password} = req.body;

        //check if all fields are filled
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        //Check eisting User
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success:true,
            message: "User Registered Successfully",
            user,
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Login User
const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        //Find User
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message: "Invalid Email",
            });
        }

        //Comapare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid Password",
            });
        }
        
        //Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: "7d", 
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                phone:
                    user.phone || "",

                dateOfBirth:
                    user.dateOfBirth || null,

                gender:
                    user.gender || "",

                address:
                    user.address || "",

                profileImage:
                    user.profileImage || "",

                profileImagePosition:
                    user.profileImagePosition ||
                    "50% 50%",

                profileImageZoom:
                    user.profileImageZoom ||
                    1,
            },
        });
    }catch (error) {
        res.status(500).json({
            success:false,
            message: error.message,
        });
    }

};

// =====================================================
// UPDATE USER PROFILE
// =====================================================

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            name,
            email,
            phone,
            dateOfBirth,
            gender,
            address,
            removeProfileImage,
            profileImagePosition,
            profileImageZoom,
        } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // =================================================
        // NAME
        // =================================================

        if (name !== undefined) {
            const trimmedName = name.trim();

            if (!trimmedName) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Name cannot be empty",
                });
            }

            user.name = trimmedName;
        }

        // =================================================
        // EMAIL
        // =================================================

        if (email !== undefined) {
            const trimmedEmail =
                email.trim().toLowerCase();

            if (!trimmedEmail) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Email cannot be empty",
                });
            }

            if (trimmedEmail !== user.email) {
                const existingUser =
                    await User.findOne({
                        email: trimmedEmail,
                        _id: {
                            $ne: userId,
                        },
                    });

                if (existingUser) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "Email already in use",
                    });
                }

                user.email = trimmedEmail;
            }
        }

        // =================================================
        // PHONE
        // =================================================

        if (phone !== undefined) {
            const cleanPhone =
                phone.trim();

            if (
                cleanPhone &&
                !/^[0-9]{10}$/.test(
                    cleanPhone
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Enter a valid 10 digit mobile number",
                });
            }

            user.phone = cleanPhone;
        }

        // =================================================
        // DATE OF BIRTH
        // =================================================

        if (dateOfBirth !== undefined) {

            if (!dateOfBirth) {
                user.dateOfBirth = null;
            } else {

                const parsedDate =
                    new Date(dateOfBirth);

                if (
                    Number.isNaN(
                        parsedDate.getTime()
                    )
                ) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "Invalid date of birth",
                    });
                }

                if (
                    parsedDate > new Date()
                ) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "Date of birth cannot be in the future",
                    });
                }

                user.dateOfBirth =
                    parsedDate;
            }
        }

        // =================================================
        // GENDER
        // =================================================

        if (gender !== undefined) {

            const allowedGenderValues = [
                "",
                "Male",
                "Female",
                "Other",
                "Prefer not to say",
            ];

            if (
                !allowedGenderValues.includes(
                    gender
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid gender value",
                });
            }

            user.gender = gender;
        }

        // =================================================
        // ADDRESS
        // =================================================

        if (address !== undefined) {
            user.address =
                address.trim();
        }

        // =================================================
        // REMOVE PROFILE IMAGE
        // =================================================

        if (
            removeProfileImage === "true" &&
            user.profileImagePublicId
        ) {
            try {
                await cloudinary.uploader.destroy(
                    user.profileImagePublicId
                );
            } catch (cloudinaryError) {
                console.error(
                    "Profile Image Delete Error:",
                    cloudinaryError.message
                );
            }

            user.profileImage = "";
            user.profileImagePublicId = "";

            user.profileImagePosition =
                "50% 50%";

            user.profileImageZoom = 1;
        }

        // =================================================
        // NEW PROFILE IMAGE
        // =================================================

        if (req.file) {

            if (user.profileImagePublicId) {
                try {
                    await cloudinary.uploader.destroy(
                        user.profileImagePublicId
                    );
                } catch (cloudinaryError) {
                    console.error(
                        "Old Profile Image Delete Error:",
                        cloudinaryError.message
                    );
                }
            }

            user.profileImage =
                req.file.path || "";

            user.profileImagePublicId =
                req.file.filename || "";

            // Reset crop for newly selected image
            user.profileImagePosition =
                "50% 50%";

            user.profileImageZoom = 1;
        }

        // =================================================
        // PROFILE IMAGE POSITION / ZOOM
        // =================================================

        if (
            profileImagePosition !== undefined &&
            typeof profileImagePosition === "string"
        ) {
            user.profileImagePosition =
                profileImagePosition;
        }

        if (
            profileImageZoom !== undefined
        ) {
            const zoom =
                Number(
                    profileImageZoom
                );

            if (
                Number.isFinite(zoom) &&
                zoom >= 1 &&
                zoom <= 2
            ) {
                user.profileImageZoom =
                    zoom;
            }
        }

        // =================================================
        // SAVE
        // =================================================

        await user.save();

        // =================================================
        // RESPONSE
        // =================================================

        return res.status(200).json({
            success: true,

            message:
                "Profile updated successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                phone:
                    user.phone || "",

                dateOfBirth:
                    user.dateOfBirth || null,

                gender:
                    user.gender || "",

                address:
                    user.address || "",

                profileImage:
                    user.profileImage || "",

                profileImagePublicId:
                    user.profileImagePublicId ||
                    "",

                profileImagePosition:
                    user.profileImagePosition ||
                    "50% 50%",

                profileImageZoom:
                    user.profileImageZoom ||
                    1,
            },
        });

    } catch (error) {

        console.error(
            "Update Profile Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    registerUser,
    loginUser,
    updateProfile,
};
