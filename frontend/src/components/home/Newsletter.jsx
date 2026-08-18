import React, { useState } from "react";

function Newsletter() {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!email.trim()) {
            return;
        }

        setEmail("");
    };

    return (
        <section className="newsletter-section">

            <div className="newsletter-box">

                <div className="newsletter-icon">
                    ✉
                </div>

                <div className="newsletter-content">

                    <span className="newsletter-label">
                        STAY UPDATED
                    </span>

                    <h2>
                        Subscribe To Our Newsletter
                    </h2>

                    <p>
                        Get the latest products, offers and updates
                        directly in your inbox.
                    </p>

                </div>

                <form
                    className="newsletter-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Subscribe
                        <span>→</span>
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Newsletter;