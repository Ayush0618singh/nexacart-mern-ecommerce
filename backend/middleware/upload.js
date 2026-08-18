const multer = require("multer");

const cloudinary = require("../config/cloudinary");

const {
    CloudinaryStorage,
} = require("multer-storage-cloudinary");


// =====================================================
// PRODUCT IMAGE STORAGE
// =====================================================

const productStorage =
    new CloudinaryStorage({

        cloudinary,

        params: {
            folder:
                "mern-ecommerce-products",

            allowed_formats: [
                "jpg",
                "png",
                "webp",
            ],
        },

    });


// =====================================================
// PROFILE IMAGE STORAGE
// =====================================================

const profileStorage =
    new CloudinaryStorage({

        cloudinary,

        params: {
            folder:
                "mern-ecommerce-profiles",

            allowed_formats: [
                "jpg",
                "png",
                "webp",
            ],
        },

    });


// =====================================================
// PRODUCT UPLOAD
// =====================================================

const upload = multer({
    storage: productStorage,
});


// =====================================================
// PROFILE UPLOAD
// =====================================================

const profileUpload = multer({
    storage: profileStorage,
});


// =====================================================
// KEEP PRODUCT UPLOAD COMPATIBILITY
// =====================================================

upload.profileUpload = profileUpload;


module.exports = upload;