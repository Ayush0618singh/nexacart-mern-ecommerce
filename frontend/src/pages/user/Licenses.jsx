import React from "react";
import { Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaBalanceScale,
    FaCloud,
    FaCreditCard,
    FaDatabase,
    FaFileCode,
    FaReact,
    FaServer,
} from "react-icons/fa";

import "../../styles/help.css";

function Licenses() {
    const technologies = [
        {
            name: "React",
            category: "Frontend Library",
            description:
                "Used to build the interactive user interface and reusable components of NexaCart.",
            icon: <FaReact />,
        },
        {
            name: "React Router",
            category: "Application Routing",
            description:
                "Used for client-side navigation and route management.",
            icon: <FaFileCode />,
        },
        {
            name: "Axios",
            category: "HTTP Client",
            description:
                "Used for communication between the frontend and backend APIs.",
            icon: <FaServer />,
        },
        {
            name: "Bootstrap",
            category: "UI Framework",
            description:
                "Used for responsive layout and interface utilities where applicable.",
            icon: <FaFileCode />,
        },
        {
            name: "MongoDB",
            category: "Database",
            description:
                "Used as the database layer for e-commerce and application data.",
            icon: <FaDatabase />,
        },
        {
            name: "Node.js / Express",
            category: "Backend",
            description:
                "Used to build the backend API and server-side functionality.",
            icon: <FaServer />,
        },
        {
            name: "Cloudinary",
            category: "Media Storage",
            description:
                "Used for product and image asset storage and delivery.",
            icon: <FaCloud />,
        },
        {
            name: "Razorpay",
            category: "Payments",
            description:
                "Used for the configured online payment flow.",
            icon: <FaCreditCard />,
        },
    ];

    return (
        <div className="help-page">
            <div className="help-container">

                <section className="policy-hero">

                    <Link
                        to="/help"
                        className="faq-back-link"
                    >
                        <FaArrowLeft />
                        Back to Help Center
                    </Link>

                    <div className="policy-hero-main">

                        <div>
                            <span className="help-kicker">
                                NEXACART INFORMATION
                            </span>

                            <h1>
                                Licenses &
                                <span>
                                    Credits
                                </span>
                            </h1>

                            <p>
                                Information about the technologies,
                                services and open-source tools used
                                throughout NexaCart.
                            </p>
                        </div>

                        <div className="policy-hero-icon">
                            <FaBalanceScale />
                        </div>

                    </div>

                </section>


                <section className="licenses-intro">

                    <div className="licenses-intro-icon">
                        <FaFileCode />
                    </div>

                    <div>
                        <span>
                            TECHNOLOGY & OPEN SOURCE
                        </span>

                        <h2>
                            Built with modern technologies
                        </h2>

                        <p>
                            NexaCart uses open-source libraries,
                            frameworks and third-party services.
                            Their respective licenses remain applicable.
                        </p>
                    </div>

                </section>


                <section className="policy-section">

                    <div className="help-section-heading">
                        <div>
                            <span>
                                TECHNOLOGY STACK
                            </span>

                            <h2>
                                Tools & Services
                            </h2>
                        </div>
                    </div>

                    <div className="licenses-grid">

                        {technologies.map((technology) => (
                            <article
                                key={technology.name}
                                className="license-card"
                            >
                                <div className="license-icon">
                                    {technology.icon}
                                </div>

                                <div className="license-content">

                                    <span>
                                        {technology.category}
                                    </span>

                                    <h3>
                                        {technology.name}
                                    </h3>

                                    <p>
                                        {technology.description}
                                    </p>

                                </div>
                            </article>
                        ))}

                    </div>

                </section>


                <section className="policy-content-card licenses-note-card">

                    <div className="policy-content-card-heading">

                        <FaBalanceScale />

                        <h2>
                            Third-Party Licenses
                        </h2>

                    </div>

                    <div className="policy-content-block">

                        <h3>
                            Open-source software
                        </h3>

                        <p>
                            Third-party open-source packages remain
                            subject to their respective licenses and
                            copyright notices.
                        </p>

                    </div>

                    <div className="policy-content-block">

                        <h3>
                            Service providers
                        </h3>

                        <p>
                            External services such as cloud storage
                            and payment providers are subject to their
                            own terms and policies.
                        </p>

                    </div>

                    <div className="policy-content-block">

                        <h3>
                            License information
                        </h3>

                        <p>
                            Complete license terms and copyright
                            notices remain with their respective
                            authors or publishers.
                        </p>

                    </div>

                </section>


                <section className="licenses-note-strip">

                    <FaBalanceScale />

                    <div>
                        <strong>
                            Attribution & Credits
                        </strong>

                        <span>
                            External libraries, services and other
                            third-party resources remain subject to
                            their respective ownership and usage terms.
                        </span>
                    </div>

                </section>


                <section className="policy-cta">

                    <div className="policy-cta-icon">
                        <FaFileCode />
                    </div>

                    <div>
                        <span>
                            NEED MORE INFORMATION?
                        </span>

                        <h2>
                            Visit Help Center or contact support.
                        </h2>
                    </div>

                    <Link
                        to="/help"
                        className="faq-support-button"
                    >
                        Help Center
                    </Link>

                    <Link
                        to="/contact-support"
                        className="faq-support-button"
                    >
                        Contact Support
                    </Link>

                </section>


                <div className="help-footer-note">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Open Source • Credits • Technology
                    </span>

                </div>

            </div>
        </div>
    );
}

export default Licenses;