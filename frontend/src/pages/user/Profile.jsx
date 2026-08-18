import React, {
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    FaCamera,
    FaTrash,
    FaUser,
    FaEnvelope,
    FaShieldAlt,
    FaShoppingBag,
    FaHeart,
    FaShoppingCart,
    FaCheckCircle,
    FaEdit,
    FaSave,
    FaTimes,
    FaPhone,
    FaCalendarAlt,
    FaVenusMars,
    FaMapMarkerAlt,
    FaUndo,
    FaSearchPlus,
    FaSearchMinus,
    FaChevronDown,
    FaChevronUp,
    FaHome,
    FaLock,
    FaCreditCard,
    FaFingerprint,
    FaCompass,
    FaMobileAlt,
    FaLaptop,
    FaTshirt,
    FaLifeRing,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import {
    updateUserProfile,
} from "../../services/authService";

import "../../styles/profile.css";


function Profile() {

    const {
        user,
        updateUser,
    } = useContext(AuthContext);


    // =====================================================
    // BASIC PROFILE
    // =====================================================

    const [name, setName] =
        useState(user?.name || "");

    const [email, setEmail] =
        useState(user?.email || "");

    const [phone, setPhone] =
        useState(user?.phone || "");

    const [dateOfBirth, setDateOfBirth] =
        useState(
            user?.dateOfBirth
                ? String(
                    user.dateOfBirth
                ).slice(0, 10)
                : ""
        );

    const [gender, setGender] =
        useState(user?.gender || "");

    const [address, setAddress] =
        useState(user?.address || "");


    // =====================================================
    // PHOTO
    // =====================================================

    const [previewImage, setPreviewImage] =
        useState(
            user?.profileImage || ""
        );

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [removeImage, setRemoveImage] =
        useState(false);


    // =====================================================
    // PHOTO POSITION
    // =====================================================

    const [imagePositionX, setImagePositionX] =
        useState(50);

    const [imagePositionY, setImagePositionY] =
        useState(50);

    const [imageZoom, setImageZoom] =
        useState(
            Number(
                user?.profileImageZoom || 1
            )
        );


    // =====================================================
    // UI STATE
    // =====================================================

    const [editing, setEditing] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [openSection, setOpenSection] =
        useState("personal");

    const fileInputRef =
        useRef(null);


    // =====================================================
    // SYNC USER
    // =====================================================

    useEffect(() => {

        setName(
            user?.name || ""
        );

        setEmail(
            user?.email || ""
        );

        setPhone(
            user?.phone || ""
        );

        setDateOfBirth(
            user?.dateOfBirth
                ? String(
                    user.dateOfBirth
                ).slice(0, 10)
                : ""
        );

        setGender(
            user?.gender || ""
        );

        setAddress(
            user?.address || ""
        );

        setPreviewImage(
            user?.profileImage || ""
        );

    }, [user]);


    // =====================================================
    // LOAD SAVED PHOTO POSITION
    // =====================================================

    useEffect(() => {

        const position =
            user?.profileImagePosition ||
            "50% 50%";

        const parts =
            position.split(" ");

        setImagePositionX(
            parseFloat(parts[0]) || 50
        );

        setImagePositionY(
            parseFloat(parts[1]) || 50
        );

        setImageZoom(
            Number(
                user?.profileImageZoom || 1
            )
        );

    }, [
        user?.profileImagePosition,
        user?.profileImageZoom,
    ]);


    // =====================================================
    // PROFILE COMPLETION
    // =====================================================

    const profileCompletion =
        useMemo(() => {

            const fields = [
                user?.name,
                user?.email,
                user?.phone,
                user?.dateOfBirth,
                user?.gender,
                user?.address,
                user?.profileImage,
            ];

            const completed =
                fields.filter(Boolean).length;

            return Math.round(
                (completed /
                    fields.length) *
                100
            );

        }, [user]);


    // =====================================================
    // PHOTO CHANGE
    // =====================================================

    const handleImageChange = (
        event
    ) => {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (
            !allowedTypes.includes(
                file.type
            )
        ) {

            toast.error(
                "Please select JPG, PNG or WEBP image."
            );

            event.target.value = "";

            return;
        }

        if (
            file.size >
            5 * 1024 * 1024
        ) {

            toast.error(
                "Profile image must be less than 5 MB."
            );

            event.target.value = "";

            return;
        }

        const imageUrl =
            URL.createObjectURL(file);

        setSelectedFile(file);

        setPreviewImage(imageUrl);

        setRemoveImage(false);

        setImagePositionX(50);

        setImagePositionY(50);

        setImageZoom(1);

        setEditing(true);

        setOpenSection("personal");

    };


    // =====================================================
    // REMOVE PHOTO
    // =====================================================

    const handleRemoveImage = () => {

        setSelectedFile(null);

        setPreviewImage("");

        setRemoveImage(true);

        setEditing(true);

    };


    // =====================================================
    // RESTORE PHOTO
    // =====================================================

    const handleRestoreImage = () => {

        setSelectedFile(null);

        setRemoveImage(false);

        setPreviewImage(
            user?.profileImage || ""
        );

        const position =
            user?.profileImagePosition ||
            "50% 50%";

        const parts =
            position.split(" ");

        setImagePositionX(
            parseFloat(parts[0]) || 50
        );

        setImagePositionY(
            parseFloat(parts[1]) || 50
        );

        setImageZoom(
            Number(
                user?.profileImageZoom || 1
            )
        );

    };


    // =====================================================
    // SAVE PROFILE
    // =====================================================

    const handleSaveProfile =
        async () => {

            if (!name.trim()) {

                toast.error(
                    "Name cannot be empty."
                );

                return;
            }

            if (!email.trim()) {

                toast.error(
                    "Email cannot be empty."
                );

                return;
            }

            if (
                phone &&
                !/^[0-9]{10}$/.test(
                    phone.trim()
                )
            ) {

                toast.error(
                    "Enter a valid 10 digit mobile number."
                );

                return;
            }

            try {

                setSaving(true);

                const formData =
                    new FormData();

                formData.append(
                    "name",
                    name.trim()
                );

                formData.append(
                    "email",
                    email.trim()
                );

                formData.append(
                    "phone",
                    phone.trim()
                );

                formData.append(
                    "dateOfBirth",
                    dateOfBirth
                );

                formData.append(
                    "gender",
                    gender
                );

                formData.append(
                    "address",
                    address.trim()
                );

                formData.append(
                    "profileImagePosition",
                    `${imagePositionX}% ${imagePositionY}%`
                );

                formData.append(
                    "profileImageZoom",
                    String(imageZoom)
                );

                if (selectedFile) {

                    formData.append(
                        "profileImage",
                        selectedFile
                    );

                }

                if (removeImage) {

                    formData.append(
                        "removeProfileImage",
                        "true"
                    );

                }

                const { data } =
                    await updateUserProfile(
                        formData
                    );

                if (
                    data?.success &&
                    data?.user
                ) {

                    updateUser(
                        data.user
                    );

                    setSelectedFile(null);

                    setRemoveImage(false);

                    setPreviewImage(
                        data.user
                            .profileImage ||
                        ""
                    );

                    setEditing(false);

                    toast.success(
                        "Profile updated successfully!"
                    );

                } else {

                    toast.error(
                        data?.message ||
                        "Unable to update profile."
                    );

                }

            } catch (error) {

                console.error(
                    "Profile Update Error:",
                    error
                );

                toast.error(
                    error.response
                        ?.data
                        ?.message ||
                    "Unable to update profile."
                );

            } finally {

                setSaving(false);

            }

        };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancelEdit =
        () => {

            setName(
                user?.name || ""
            );

            setEmail(
                user?.email || ""
            );

            setPhone(
                user?.phone || ""
            );

            setDateOfBirth(
                user?.dateOfBirth
                    ? String(
                        user.dateOfBirth
                    ).slice(0, 10)
                    : ""
            );

            setGender(
                user?.gender || ""
            );

            setAddress(
                user?.address || ""
            );

            setSelectedFile(null);

            setRemoveImage(false);

            setPreviewImage(
                user?.profileImage || ""
            );

            const position =
                user?.profileImagePosition ||
                "50% 50%";

            const parts =
                position.split(" ");

            setImagePositionX(
                parseFloat(parts[0]) || 50
            );

            setImagePositionY(
                parseFloat(parts[1]) || 50
            );

            setImageZoom(
                Number(
                    user?.profileImageZoom || 1
                )
            );

            setEditing(false);

        };


    // =====================================================
    // HELPERS
    // =====================================================

    const getInitial =
        user?.name
            ?.charAt(0)
            ?.toUpperCase() ||
        "U";

    const profileImageStyle = {
        objectPosition:
            `${imagePositionX}% ${imagePositionY}%`,

        transform:
            `scale(${imageZoom})`,
    };


    const toggleSection =
        (section) => {

            setOpenSection(
                current =>
                    current === section
                        ? ""
                        : section
            );

        };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="premium-profile-page">

            <div className="premium-profile-container">


                {/* =================================================
                    WELCOME HEADER
                ================================================= */}

                <section className="profile-welcome">

                    <div>

                        <span className="profile-kicker">
                            NEXACART MEMBER AREA
                        </span>

                        <h1>
                            Welcome back,{" "}
                            {user?.name || "there"}! 👋
                        </h1>

                        <p>
                            Your personal space to manage
                            your NexaCart account.
                        </p>

                    </div>


                    <div className="profile-completion-box">

                        <div className="profile-completion-top">

                            <span>
                                Profile completion
                            </span>

                            <strong>
                                {profileCompletion}%
                            </strong>

                        </div>

                        <div className="profile-completion-track">

                            <div
                                style={{
                                    width:
                                        `${profileCompletion}%`,
                                }}
                            />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    ONBOARDING JOURNEY
                ================================================= */}

                <section className="profile-journey">

                    <div className="journey-card active">
                        <div className="journey-number">
                            1
                        </div>

                        <div>
                            <strong>
                                Setup Guide
                            </strong>

                            <span>
                                Profile basics
                            </span>
                        </div>
                    </div>


                    <div className="journey-connector" />


                    <button
                        type="button"
                        className="journey-card"
                        onClick={() => {
                            setEditing(true);
                            setOpenSection("personal");
                            document
                                .getElementById(
                                    "profile-personal"
                                )
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                });
                        }}
                    >
                        <div className="journey-number">
                            2
                        </div>

                        <div>
                            <strong>
                                Personal Info
                            </strong>

                            <span>
                                Name & contact
                            </span>
                        </div>
                    </button>


                    <div className="journey-connector" />


                    <button
                        type="button"
                        className="journey-card"
                        onClick={() => {
                            setOpenSection("security");
                            document
                                .getElementById(
                                    "profile-security"
                                )
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                });
                        }}
                    >
                        <div className="journey-number">
                            3
                        </div>

                        <div>
                            <strong>
                                Security
                            </strong>

                            <span>
                                Account protection
                            </span>
                        </div>
                    </button>


                    <div className="journey-connector" />


                    <Link
                        to="/wishlist"
                        className="journey-card"
                    >
                        <div className="journey-number">
                            4
                        </div>

                        <div>
                            <strong>
                                Wishlist
                            </strong>

                            <span>
                                Your saved items
                            </span>
                        </div>
                    </Link>

                </section>


                {/* =================================================
                    MAIN TWO COLUMN LAYOUT
                ================================================= */}

                <section className="profile-main-layout">


                    {/* =================================================
                        LEFT — SIGNATURE PROFILE
                    ================================================= */}

                    <div className="signature-profile-card">

                        <div className="signature-top">

                            <span className="member-pill">
                                ✦ NexaCart Member
                            </span>

                            <span className="member-status">
                                <FaCheckCircle />
                                Active Account
                            </span>

                        </div>


                        <h2>
                            Your Signature Profile Picture
                        </h2>


                        <div className="signature-photo-wrap">

                            <div className="signature-photo">

                                {previewImage ? (

                                    <img
                                        src={
                                            previewImage
                                        }
                                        alt={
                                            user?.name ||
                                            "Profile"
                                        }
                                        style={
                                            profileImageStyle
                                        }
                                    />

                                ) : (

                                    <span>
                                        {getInitial}
                                    </span>

                                )}

                            </div>


                            <button
                                type="button"
                                className="signature-camera"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                title="Change photo"
                            >
                                <FaCamera />
                            </button>

                        </div>


                        <div className="signature-actions">

                            <button
                                type="button"
                                className="gold-action-button"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                            >
                                <FaCamera />
                                Upload New Photo
                            </button>


                            {previewImage ? (

                                <button
                                    type="button"
                                    className="dark-outline-button"
                                    onClick={
                                        handleRemoveImage
                                    }
                                >
                                    <FaTrash />
                                    Remove Photo
                                </button>

                            ) : (

                                <button
                                    type="button"
                                    className="dark-outline-button"
                                    onClick={
                                        handleRestoreImage
                                    }
                                >
                                    <FaUndo />
                                    Restore Photo
                                </button>

                            )}

                        </div>


                        <input
                            ref={fileInputRef}
                            type="file"
                            hidden
                            accept="image/jpeg,image/png,image/webp"
                            onChange={
                                handleImageChange
                            }
                        />


                        <p className="signature-help">
                            High-resolution JPG, PNG or WEBP.
                            Maximum 5 MB.
                        </p>


                        {previewImage && editing && (

                            <div className="signature-editor">

                                <div className="signature-editor-heading">

                                    <div>
                                        <strong>
                                            Edit Current Avatar
                                        </strong>

                                        <span>
                                            Position the image exactly
                                            the way you like.
                                        </span>
                                    </div>

                                    <FaCompass />

                                </div>


                                <div className="signature-editor-preview">

                                    <div className="editor-circle">

                                        <img
                                            src={
                                                previewImage
                                            }
                                            alt="Profile preview"
                                            style={
                                                profileImageStyle
                                            }
                                        />

                                    </div>

                                </div>


                                <div className="profile-slider-group">

                                    <div className="slider-label">
                                        <span>
                                            Zoom
                                        </span>

                                        <strong>
                                            {imageZoom.toFixed(
                                                2
                                            )}x
                                        </strong>
                                    </div>

                                    <div className="slider-row">
                                        <FaSearchMinus />

                                        <input
                                            type="range"
                                            min="1"
                                            max="2"
                                            step="0.05"
                                            value={
                                                imageZoom
                                            }
                                            onChange={
                                                (e) =>
                                                    setImageZoom(
                                                        Number(
                                                            e.target
                                                                .value
                                                        )
                                                    )
                                            }
                                        />

                                        <FaSearchPlus />
                                    </div>

                                </div>


                                <div className="profile-slider-group">

                                    <div className="slider-label">
                                        <span>
                                            Horizontal
                                        </span>

                                        <strong>
                                            {Math.round(
                                                imagePositionX
                                            )}%
                                        </strong>
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={
                                            imagePositionX
                                        }
                                        onChange={
                                            (e) =>
                                                setImagePositionX(
                                                    Number(
                                                        e.target
                                                            .value
                                                    )
                                                )
                                        }
                                    />

                                </div>


                                <div className="profile-slider-group">

                                    <div className="slider-label">
                                        <span>
                                            Vertical
                                        </span>

                                        <strong>
                                            {Math.round(
                                                imagePositionY
                                            )}%
                                        </strong>
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={
                                            imagePositionY
                                        }
                                        onChange={
                                            (e) =>
                                                setImagePositionY(
                                                    Number(
                                                        e.target
                                                            .value
                                                    )
                                                )
                                        }
                                    />

                                </div>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        RIGHT — CURATED DETAILS
                    ================================================= */}

                    <div className="curated-details-card">

                        <div className="curated-heading">
                            <h2>
                                Curated NexaCart Details
                            </h2>

                            <span>
                                Personalize your account
                            </span>
                        </div>


                        {/* PERSONAL INFORMATION */}

                        <div
                            id="profile-personal"
                            className={`curated-section ${
                                openSection ===
                                "personal"
                                    ? "section-open"
                                    : ""
                            }`}
                        >

                            <button
                                type="button"
                                className="curated-section-header"
                                onClick={() =>
                                    toggleSection(
                                        "personal"
                                    )
                                }
                            >

                                <div>
                                    <strong>
                                        1. Personal Information
                                    </strong>

                                    <span>
                                        Name, email, contact and
                                        address
                                    </span>
                                </div>

                                {openSection ===
                                "personal" ? (
                                    <FaChevronUp />
                                ) : (
                                    <FaChevronDown />
                                )}

                            </button>


                            {openSection ===
                                "personal" && (

                                <div className="curated-section-body">

                                    <div className="profile-mini-grid">

                                        <div className="premium-field">
                                            <label>
                                                <FaUser />
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    name
                                                }
                                                disabled={
                                                    !editing
                                                }
                                                onChange={
                                                    (e) =>
                                                        setName(
                                                            e.target.value
                                                        )
                                                }
                                            />
                                        </div>


                                        <div className="premium-field">
                                            <label>
                                                <FaEnvelope />
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                value={
                                                    email
                                                }
                                                disabled={
                                                    !editing
                                                }
                                                onChange={
                                                    (e) =>
                                                        setEmail(
                                                            e.target.value
                                                        )
                                                }
                                            />
                                        </div>


                                        <div className="premium-field">
                                            <label>
                                                <FaPhone />
                                                Mobile Number
                                            </label>

                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength="10"
                                                placeholder="10 digit number"
                                                value={
                                                    phone
                                                }
                                                disabled={
                                                    !editing
                                                }
                                                onChange={
                                                    (e) =>
                                                        setPhone(
                                                            e.target
                                                                .value
                                                                .replace(
                                                                    /\D/g,
                                                                    ""
                                                                )
                                                                .slice(
                                                                    0,
                                                                    10
                                                                )
                                                        )
                                                }
                                            />
                                        </div>


                                        <div className="premium-field">
                                            <label>
                                                <FaCalendarAlt />
                                                Date of Birth
                                            </label>

                                            <input
                                                type="date"
                                                value={
                                                    dateOfBirth
                                                }
                                                disabled={
                                                    !editing
                                                }
                                                onChange={
                                                    (e) =>
                                                        setDateOfBirth(
                                                            e.target.value
                                                        )
                                                }
                                            />
                                        </div>


                                        <div className="premium-field">
                                            <label>
                                                <FaVenusMars />
                                                Gender
                                            </label>

                                            <select
                                                value={
                                                    gender
                                                }
                                                disabled={
                                                    !editing
                                                }
                                                onChange={
                                                    (e) =>
                                                        setGender(
                                                            e.target.value
                                                        )
                                                }
                                            >
                                                <option value="">
                                                    Select
                                                </option>

                                                <option value="Male">
                                                    Male
                                                </option>

                                                <option value="Female">
                                                    Female
                                                </option>

                                                <option value="Other">
                                                    Other
                                                </option>

                                                <option value="Prefer not to say">
                                                    Prefer not to say
                                                </option>
                                            </select>
                                        </div>


                                        <div className="premium-field">
                                            <label>
                                                <FaShieldAlt />
                                                Account Type
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    user?.role ===
                                                    "admin"
                                                        ? "Administrator"
                                                        : "Customer"
                                                }
                                                disabled
                                            />
                                        </div>


                                        <div className="premium-field field-wide">
                                            <label>
                                                <FaMapMarkerAlt />
                                                Address
                                            </label>

                                            <textarea
                                                rows="3"
                                                placeholder="Enter your complete address"
                                                value={
                                                    address
                                                }
                                                disabled={
                                                    !editing
                                                }
                                                onChange={
                                                    (e) =>
                                                        setAddress(
                                                            e.target.value
                                                        )
                                                }
                                            />
                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* SHOPPING INTERESTS */}

                        <div className="curated-section">

                            <button
                                type="button"
                                className="curated-section-header"
                                onClick={() =>
                                    toggleSection(
                                        "interests"
                                    )
                                }
                            >

                                <div>
                                    <strong>
                                        2. Your Shopping Interests
                                    </strong>

                                    <span>
                                        Explore curated NexaCart
                                        collections
                                    </span>
                                </div>

                                {openSection ===
                                "interests" ? (
                                    <FaChevronUp />
                                ) : (
                                    <FaChevronDown />
                                )}

                            </button>


                            {openSection ===
                                "interests" && (

                                <div className="curated-section-body">

                                    <div className="interest-grid">

                                        <Link
                                            to="/products"
                                            className="interest-card"
                                        >
                                            <FaMobileAlt />

                                            <div>
                                                <strong>
                                                    Tech & Electronics
                                                </strong>

                                                <span>
                                                    Gadgets, laptops and more
                                                </span>
                                            </div>
                                        </Link>


                                        <Link
                                            to="/products"
                                            className="interest-card"
                                        >
                                            <FaHome />

                                            <div>
                                                <strong>
                                                    Home
                                                </strong>

                                                <span>
                                                    Smart and everyday essentials
                                                </span>
                                            </div>
                                        </Link>


                                        <Link
                                            to="/products"
                                            className="interest-card"
                                        >
                                            <FaTshirt />

                                            <div>
                                                <strong>
                                                    Fashion
                                                </strong>

                                                <span>
                                                    Style for every occasion
                                                </span>
                                            </div>
                                        </Link>


                                        <Link
                                            to="/products"
                                            className="interest-card"
                                        >
                                            <FaLaptop />

                                            <div>
                                                <strong>
                                                    Work & Study
                                                </strong>

                                                <span>
                                                    Products for productivity
                                                </span>
                                            </div>
                                        </Link>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* SAVED ADDRESS */}

                        <div className="curated-section">

                            <button
                                type="button"
                                className="curated-section-header"
                                onClick={() =>
                                    toggleSection(
                                        "address"
                                    )
                                }
                            >

                                <div>
                                    <strong>
                                        3. Saved Address
                                    </strong>

                                    <span>
                                        Your current delivery address
                                    </span>
                                </div>

                                {openSection ===
                                "address" ? (
                                    <FaChevronUp />
                                ) : (
                                    <FaChevronDown />
                                )}

                            </button>


                            {openSection ===
                                "address" && (

                                <div className="curated-section-body">

                                    <div className="saved-address-card">

                                        <div className="saved-address-icon">
                                            <FaMapMarkerAlt />
                                        </div>

                                        <div>

                                            <strong>
                                                Default Delivery Address
                                            </strong>

                                            <span>
                                                {address ||
                                                    "No address added yet. Add your delivery address in Personal Information."}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* SECURITY */}

                        <div
                            id="profile-security"
                            className="curated-section"
                        >

                            <button
                                type="button"
                                className="curated-section-header"
                                onClick={() =>
                                    toggleSection(
                                        "security"
                                    )
                                }
                            >

                                <div>
                                    <strong>
                                        4. Payment Methods & Security
                                    </strong>

                                    <span>
                                        Protected account experience
                                    </span>
                                </div>

                                {openSection ===
                                "security" ? (
                                    <FaChevronUp />
                                ) : (
                                    <FaChevronDown />
                                )}

                            </button>


                            {openSection ===
                                "security" && (

                                <div className="curated-section-body">

                                    <div className="security-grid">

                                        <div className="security-card">
                                            <FaCreditCard />

                                            <div>
                                                <strong>
                                                    Secure Payments
                                                </strong>

                                                <span>
                                                    Online payments are
                                                    handled through
                                                    Razorpay.
                                                </span>
                                            </div>
                                        </div>


                                        <div className="security-card">
                                            <FaLock />

                                            <div>
                                                <strong>
                                                    Protected Account
                                                </strong>

                                                <span>
                                                    Your authenticated
                                                    session protects
                                                    account actions.
                                                </span>
                                            </div>
                                        </div>


                                        <div className="security-card">
                                            <FaFingerprint />

                                            <div>
                                                <strong>
                                                    Account Privacy
                                                </strong>

                                                <span>
                                                    Profile information
                                                    stays linked to your
                                                    account.
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>

                    </div>

                </section>


                {/* =================================================
                    ACTION BAR
                ================================================= */}

                <section className="profile-action-bar">

                    <div className="profile-action-links">

                        <Link
                            to="/"
                            className="profile-home-link"
                        >
                            <FaHome />

                            <div>
                                <strong>
                                    Hub Home
                                </strong>

                                <span>
                                    My NexaCart Home
                                </span>
                            </div>
                        </Link>


                        <Link
                            to="/orders"
                            className="profile-action-small"
                        >
                            <FaShoppingBag />
                            Orders
                        </Link>


                        <Link
                            to="/wishlist"
                            className="profile-action-small"
                        >
                            <FaHeart />
                            Wishlist
                        </Link>


                        <Link
                            to="/cart"
                            className="profile-action-small"
                        >
                            <FaShoppingCart />
                            Cart
                        </Link>

                        <Link
                            to="/help"
                            className="profile-help-card"
                        >
                            <div className="profile-help-icon">
                                <FaLifeRing />
                            </div>

                            <div className="profile-help-content">
                                <strong>
                                    Help & Support
                                </strong>

                                <span>
                                    Orders • Payments • Returns & More
                                </span>
                            </div>

                            <span className="profile-help-arrow">
                                →
                            </span>
                        </Link>

                    </div>


                    <div className="profile-save-area">

                        <button
                            type="button"
                            className="profile-update-button"
                            onClick={() => {

                                setEditing(true);

                                setOpenSection(
                                    "personal"
                                );

                                document
                                    .getElementById(
                                        "profile-personal"
                                    )
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                    });

                            }}
                        >
                            <FaEdit />
                            Update My Profile
                        </button>

                        {editing && (

                            <div className="profile-edit-actions">

                                <button
                                    type="button"
                                    className="profile-cancel-button"
                                    onClick={
                                        handleCancelEdit
                                    }
                                    disabled={
                                        saving
                                    }
                                >
                                    <FaTimes />
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    className="profile-save-button"
                                    onClick={
                                        handleSaveProfile
                                    }
                                    disabled={
                                        saving
                                    }
                                >
                                    <FaSave />

                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                            </div>

                        )}

                    </div>

                </section>


                {/* =================================================
                    FOOTER STATUS
                ================================================= */}

                <div className="profile-footer-status">

                    <span>
                        <FaCheckCircle />
                        All systems operational
                    </span>

                    <span>
                        <FaShieldAlt />
                        Secure connection
                    </span>

                    <span>
                        NexaCart Premium Support
                    </span>

                </div>

            </div>

        </div>
    );
}


export default Profile;