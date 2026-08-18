import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    FaBell,
    FaShieldAlt,
    FaPalette,
    FaSave,
} from "react-icons/fa";

import "../../styles/admin.css";

function Settings() {

    const [settings, setSettings] = useState({
        notifications: true,
        compactMode: false,
        animations: true,
    });

    useEffect(() => {

        const saved =
            localStorage.getItem(
                "nexacart_admin_settings"
            );

        if (!saved) {
            return;
        }

        try {
            setSettings(
                JSON.parse(saved)
            );
        } catch (error) {
            console.error(
                "Settings parse error:",
                error
            );
        }

    }, []);


    const toggleSetting = (key) => {

        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));

    };


    const saveSettings = () => {

        localStorage.setItem(
            "nexacart_admin_settings",
            JSON.stringify(settings)
        );

        toast.success(
            "Admin settings saved"
        );

    };


    return (
        <div className="admin-settings-page">

            <div className="admin-settings-shell">

                <div className="admin-settings-header">

                    <div>
                        <span className="admin-section-eyebrow">
                            ADMIN CONTROL
                        </span>

                        <h1>Settings</h1>

                        <p>
                            Personalize your NexaCart
                            administration experience.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="admin-primary-action"
                        onClick={saveSettings}
                    >
                        <FaSave />
                        Save Changes
                    </button>

                </div>


                <section className="admin-settings-card">

                    <div className="admin-settings-card-header">

                        <div className="admin-settings-card-icon">
                            <FaBell />
                        </div>

                        <div>
                            <h2>Dashboard Preferences</h2>

                            <p>
                                Control admin interface
                                behaviour.
                            </p>
                        </div>

                    </div>


                    <div className="admin-setting-row">

                        <div className="admin-setting-info">

                            <strong>
                                Notifications
                            </strong>

                            <span>
                                Show notification indicators
                                across the admin panel.
                            </span>

                        </div>

                        <button
                            type="button"
                            className={`admin-toggle ${
                                settings.notifications
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                toggleSetting(
                                    "notifications"
                                )
                            }
                        >
                            <span />
                        </button>

                    </div>


                    <div className="admin-setting-row">

                        <div className="admin-setting-info">

                            <strong>
                                Compact Mode
                            </strong>

                            <span>
                                Keep dashboard sections
                                tighter and more condensed.
                            </span>

                        </div>

                        <button
                            type="button"
                            className={`admin-toggle ${
                                settings.compactMode
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                toggleSetting(
                                    "compactMode"
                                )
                            }
                        >
                            <span />
                        </button>

                    </div>


                    <div className="admin-setting-row">

                        <div className="admin-setting-info">

                            <strong>
                                Smooth Animations
                            </strong>

                            <span>
                                Keep subtle hover and
                                transition effects enabled.
                            </span>

                        </div>

                        <button
                            type="button"
                            className={`admin-toggle ${
                                settings.animations
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                toggleSetting(
                                    "animations"
                                )
                            }
                        >
                            <span />
                        </button>

                    </div>

                </section>


                <section className="admin-settings-card">

                    <div className="admin-settings-card-header">

                        <div className="admin-settings-card-icon">
                            <FaShieldAlt />
                        </div>

                        <div>
                            <h2>Security</h2>

                            <p>
                                Current administrator access
                                status.
                            </p>
                        </div>

                    </div>


                    <div className="admin-security-box">

                        <div>

                            <strong>
                                Administrator Session
                            </strong>

                            <span>
                                You currently have full
                                administrative privileges.
                            </span>

                        </div>

                        <span className="admin-security-status">
                            Active
                        </span>

                    </div>

                </section>


                <section className="admin-settings-card">

                    <div className="admin-settings-card-header">

                        <div className="admin-settings-card-icon">
                            <FaPalette />
                        </div>

                        <div>
                            <h2>Brand Experience</h2>

                            <p>
                                NexaCart uses its premium
                                navy, teal and gold theme.
                            </p>
                        </div>

                    </div>

                    <div className="admin-theme-preview">

                        <span className="theme-dot navy" />
                        <span className="theme-dot teal" />
                        <span className="theme-dot gold" />

                        <strong>
                            Premium NexaCart Theme
                        </strong>

                    </div>

                </section>

            </div>

        </div>
    );
}

export default Settings;