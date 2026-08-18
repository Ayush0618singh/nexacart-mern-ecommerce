const nodemailer = require("nodemailer");

const Newsletter = require("../models/newsletterModel");


// =========================================================
// SUBSCRIBE TO NEWSLETTER
// =========================================================

const subscribeNewsletter = async (req, res) => {

    try {

        const { email } = req.body || {};


        // =====================================================
        // VALIDATION
        // =====================================================

        if (!email?.trim()) {

            return res.status(400).json({
                success: false,
                message: "Please enter your email address.",
            });

        }


        // =====================================================
        // EMAIL FORMAT
        // =====================================================

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const normalizedEmail =
            email.trim().toLowerCase();


        if (!emailRegex.test(normalizedEmail)) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });

        }


        // =====================================================
        // CHECK DUPLICATE
        // =====================================================

        const existingSubscriber =
            await Newsletter.findOne({
                email: normalizedEmail,
            });


        if (existingSubscriber) {

            return res.status(409).json({
                success: false,
                message:
                    "This email is already subscribed.",
            });

        }


        // =====================================================
        // SAVE SUBSCRIBER
        // =====================================================

        const subscriber =
            await Newsletter.create({
                email: normalizedEmail,
            });


        // =====================================================
        // MAIL TRANSPORTER
        // =====================================================

        const transporter =
            nodemailer.createTransport({

                service: "gmail",

                auth: {
                    user:
                        process.env.MAIL_USER,

                    pass:
                        process.env.MAIL_PASS,
                },

            });


        // =====================================================
        // NOTIFICATION EMAIL TO YOU
        // =====================================================

        const mailOptions = {

            from:
                `"NexaCart Newsletter" <${process.env.MAIL_USER}>`,

            to:
                process.env.SUPPORT_EMAIL,

            replyTo:
                normalizedEmail,

            subject:
                "New NexaCart Newsletter Subscriber",

            html: `

                <div style="
                    font-family: Arial, Helvetica, sans-serif;
                    max-width: 650px;
                    margin: 0 auto;
                    background: #f6f9fb;
                    padding: 30px;
                    color: #263548;
                ">

                    <div style="
                        background: #10243a;
                        color: white;
                        padding: 24px;
                        border-radius: 14px 14px 0 0;
                    ">

                        <div style="
                            font-size: 11px;
                            letter-spacing: 2px;
                            color: #82cfca;
                            font-weight: 700;
                            margin-bottom: 8px;
                        ">
                            NEXACART NEWSLETTER
                        </div>

                        <h1 style="
                            margin: 0;
                            font-size: 24px;
                        ">
                            New Subscriber
                        </h1>

                    </div>


                    <div style="
                        background: white;
                        padding: 25px;
                        border-radius: 0 0 14px 14px;
                    ">

                        <p style="
                            margin-top: 0;
                            color: #64748b;
                        ">
                            A new user has subscribed
                            to the NexaCart newsletter.
                        </p>


                        <div style="
                            margin: 20px 0;
                            padding: 16px;
                            background: #f8fafc;
                            border: 1px solid #e2e8f0;
                            border-radius: 10px;
                        ">

                            <div style="
                                font-size: 11px;
                                color: #64748b;
                                margin-bottom: 6px;
                                font-weight: 700;
                            ">
                                SUBSCRIBER EMAIL
                            </div>

                            <div style="
                                font-size: 17px;
                                color: #1e293b;
                                font-weight: 700;
                            ">
                                ${escapeHtml(normalizedEmail)}
                            </div>

                        </div>


                        <div style="
                            padding-top: 15px;
                            border-top: 1px solid #e5e7eb;
                            color: #94a3b8;
                            font-size: 12px;
                        ">
                            Subscriber ID:
                            ${subscriber._id}
                        </div>

                    </div>

                </div>

            `,
        };


        // =====================================================
        // SEND NOTIFICATION
        // =====================================================

        await transporter.sendMail(
            mailOptions
        );


        // =====================================================
        // SUCCESS
        // =====================================================

        return res.status(201).json({

            success: true,

            message:
                "You have subscribed to NexaCart newsletter successfully.",

        });

    } catch (error) {

        console.error(
            "Newsletter Error:",
            error
        );


        // Duplicate key safety
        if (error.code === 11000) {

            return res.status(409).json({
                success: false,
                message:
                    "This email is already subscribed.",
            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Unable to subscribe to newsletter.",

        });

    }
};


// =========================================================
// ESCAPE HTML
// =========================================================

const escapeHtml = (value = "") => {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

};


module.exports = {
    subscribeNewsletter,
};