const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
        },

    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },

    profileImage: {
        type: String,
        default: "",
    },

    profileImagePublicId: {
        type: String,
        default: "",
    },

    phone: {
        type: String,
        default: "",
    },

    dateOfBirth: {
        type: Date,
        default: null,
    },

    gender: {
        type: String,
        enum: [
            "",
            "Male",
            "Female",
            "Other",
            "Prefer not to say",
        ],
        default: "",
    },

    address: {
        type: String,
        default: "",
    },

    profileImagePosition: {
        type: String,
        default: "50% 50%",
    },

    profileImageZoom: {
        type: Number,
        default: 1,
        min: 1,
        max: 2,
    },

    },
    {
        timestamps:true,
    }
);
module.exports = 
    mongoose.models.User || mongoose.model("User",userSchema);