import React, { useContext } from "react";

import {
    FaUserShield,
    FaEnvelope,
    FaCheckCircle,
    FaStore,
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";

import "../../styles/admin.css";

function AdminProfile() {

    const { user } = useContext(AuthContext);

    const name =
        user?.name || "Administrator";

    const email =
        user?.email || "admin@nexacart.com";

    const initial =
        name.charAt(0).toUpperCase();

    return (
        <div className="admin-profile-page">

            <div className="admin-profile-shell">

                <div className="admin-page-heading">

                    <div>
                        <span className="admin-section-eyebrow">
                            ADMIN ACCOUNT
                        </span>

                        <h1>Admin Profile</h1>

                        <p>
                            Your administrator account and
                            NexaCart access information.
                        </p>
                    </div>

                </div>


                <section className="admin-profile-hero">

                    <div className="admin-profile-cover" />

                    <div className="admin-profile-hero-content">

                        <div className="admin-profile-avatar-large">
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={name}
                                />
                            ) : (
                                initial
                            )}
                        </div>

                        <div className="admin-profile-main-info">

                            <div className="admin-profile-name-row">

                                <h2>{name}</h2>

                                <span className="admin-verified-badge">
                                    <FaCheckCircle />
                                    Verified Admin
                                </span>

                            </div>

                            <p>
                                <FaUserShield />
                                NexaCart Administrator
                            </p>

                        </div>

                    </div>

                </section>


                <section className="admin-profile-info-grid">

                    <div className="admin-info-card">

                        <div className="admin-info-icon">
                            <FaEnvelope />
                        </div>

                        <div>
                            <span>Email Address</span>
                            <strong>{email}</strong>
                        </div>

                    </div>


                    <div className="admin-info-card">

                        <div className="admin-info-icon">
                            <FaUserShield />
                        </div>

                        <div>
                            <span>Account Role</span>
                            <strong>Administrator</strong>
                        </div>

                    </div>


                    <div className="admin-info-card">

                        <div className="admin-info-icon">
                            <FaStore />
                        </div>

                        <div>
                            <span>Store Access</span>
                            <strong>Full Admin Access</strong>
                        </div>

                    </div>

                </section>


                <section className="admin-profile-summary">

                    <div>
                        <span className="admin-section-eyebrow">
                            NEXACART CONTROL CENTER
                        </span>

                        <h2>
                            Manage your store with confidence.
                        </h2>

                        <p>
                            Products, categories, orders,
                            users, reviews and promotions
                            are managed from the Admin Panel.
                        </p>
                    </div>

                    <span className="admin-access-pill">
                        <FaCheckCircle />
                        Access Enabled
                    </span>

                </section>

            </div>

        </div>
    );
}

export default AdminProfile;