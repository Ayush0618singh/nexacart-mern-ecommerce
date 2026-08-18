import React from "react";
import { Link } from "react-router-dom";

import {
    FaShieldAlt,
    FaTruck,
    FaHeadset,
    FaUndoAlt,
} from "react-icons/fa";


function TrustStrip() {

    const items = [
        {
            icon: <FaShieldAlt />,
            title: "Secure Checkout",
            text: "Protected payments",
            link: "/payment-security",
        },

        {
            icon: <FaTruck />,
            title: "Reliable Delivery",
            text: "Track your orders",
            link: "/shipping-policy",
        },

        {
            icon: <FaHeadset />,
            title: "Easy Support",
            text: "We're here to help",
            link: "/help",
        },

        {
            icon: <FaUndoAlt />,
            title: "Easy Returns",
            text: "Simple return support",
            link: "/return-policy",
        },
    ];


    return (

        <section className="home-trust-strip">

            {items.map((item) => (

                <Link
                    to={item.link}
                    className="home-trust-item"
                    key={item.title}
                >

                    <div className="home-trust-icon">
                        {item.icon}
                    </div>


                    <div className="home-trust-content">

                        <strong>
                            {item.title}
                        </strong>

                        <span>
                            {item.text}
                        </span>

                    </div>

                </Link>

            ))}

        </section>
    );
}


export default TrustStrip;