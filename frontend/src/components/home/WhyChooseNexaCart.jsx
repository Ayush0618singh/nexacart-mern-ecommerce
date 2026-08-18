import React from "react";

import {
    FaGem,
    FaStar,
    FaHeart,
    FaShieldAlt,
} from "react-icons/fa";


function WhyChooseNexaCart() {

    const items = [
        {
            icon: <FaGem />,
            title: "Quality Products",
            text: "Carefully selected products for everyday needs.",
        },

        {
            icon: <FaStar />,
            title: "Thoughtful Selection",
            text: "Collections chosen to make shopping easier.",
        },

        {
            icon: <FaHeart />,
            title: "Customer First",
            text: "A smoother experience built around you.",
        },

        {
            icon: <FaShieldAlt />,
            title: "Secure Shopping",
            text: "Safe payments and protected personal information.",
        },
    ];


    return (

        <section className="why-nexacart">

            <div className="why-nexacart-heading">

                <span>
                    WHY NEXACART
                </span>

                <h2>
                    Better shopping,
                    <strong>
                        built around you.
                    </strong>
                </h2>

                <p>
                    Everything we do is designed to make
                    your shopping experience simple,
                    secure and enjoyable.
                </p>

            </div>


            <div className="why-nexacart-grid">

                {items.map((item) => (

                    <div
                        className="why-nexacart-card"
                        key={item.title}
                    >

                        <div className="why-nexacart-icon">
                            {item.icon}
                        </div>


                        <h3>
                            {item.title}
                        </h3>


                        <p>
                            {item.text}
                        </p>

                    </div>

                ))}

            </div>

        </section>
    );
}


export default WhyChooseNexaCart;