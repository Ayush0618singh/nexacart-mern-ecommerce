const nodemailer = require("nodemailer");


// =========================================================
// CONTACT SUPPORT
// =========================================================

const sendSupportEmail = async (req, res) => {

    try {

        const {
            name,
            email,
            orderId,
            subject,
            message,
            
        } = req.body || {};


        // =====================================================
        // VALIDATION
        // =====================================================

        if (
            !name?.trim() ||
            !email?.trim() ||
            !subject?.trim() ||
            !message?.trim()
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please fill all required fields.",
            });

        }


        // =====================================================
        // EMAIL FORMAT CHECK
        // =====================================================

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {

            return res.status(400).json({
                success: false,
                message:
                    "Please enter a valid email address.",
            });

        }


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
        // EMAIL TO YOU
        // =====================================================

        const mailOptions = {

            from: `"NexaCart Support" <${process.env.MAIL_USER}>`,

            to:
                process.env.SUPPORT_EMAIL,

            replyTo:
                email.trim(),

            subject:
                `NexaCart Support: ${subject.trim()}`,

            html: `

                <div style="
                    font-family: Arial, Helvetica, sans-serif;
                    max-width: 700px;
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
                            NEXACART SUPPORT
                        </div>

                        <h1 style="
                            margin: 0;
                            font-size: 24px;
                        ">
                            New Support Request
                        </h1>

                    </div>


                    <div style="
                        background: white;
                        padding: 25px;
                        border-radius: 0 0 14px 14px;
                    ">

                        <h2 style="
                            font-size: 17px;
                            margin-top: 0;
                            color: #29394b;
                        ">
                            Customer Information
                        </h2>


                        <table style="
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 22px;
                        ">

                            <tr>
                                <td style="
                                    padding: 9px;
                                    font-weight: 700;
                                    color: #64748b;
                                    width: 140px;
                                ">
                                    Name
                                </td>

                                <td style="
                                    padding: 9px;
                                    color: #263548;
                                ">
                                    ${escapeHtml(name.trim())}
                                </td>
                            </tr>


                            <tr>
                                <td style="
                                    padding: 9px;
                                    font-weight: 700;
                                    color: #64748b;
                                ">
                                    Email
                                </td>

                                <td style="
                                    padding: 9px;
                                ">
                                    ${escapeHtml(email.trim())}
                                </td>
                            </tr>


                            <tr>
                                <td style="
                                    padding: 9px;
                                    font-weight: 700;
                                    color: #64748b;
                                ">
                                    Order ID
                                </td>

                                <td style="
                                    padding: 9px;
                                ">
                                    ${
                                        orderId?.trim()
                                            ? escapeHtml(
                                                orderId.trim()
                                            )
                                            : "Not provided"
                                    }
                                </td>
                            </tr>


                            <tr>
                                <td style="
                                    padding: 9px;
                                    font-weight: 700;
                                    color: #64748b;
                                ">
                                    Subject
                                </td>

                                <td style="
                                    padding: 9px;
                                ">
                                    ${escapeHtml(subject.trim())}
                                </td>
                            </tr>

                        </table>


                        <h2 style="
                            font-size: 17px;
                            color: #29394b;
                        ">
                            Customer Message
                        </h2>

                        <div style="
                            background: #f8fafc;
                            border: 1px solid #e2e8f0;
                            border-radius: 10px;
                            padding: 16px;
                            line-height: 1.7;
                            white-space: pre-wrap;
                            color: #475569;
                        ">
                            ${escapeHtml(message.trim())}
                        </div>


                        <div style="
                            margin-top: 22px;
                            padding-top: 15px;
                            border-top: 1px solid #e5e7eb;
                            color: #94a3b8;
                            font-size: 12px;
                        ">
                            This message was submitted through
                            the NexaCart Contact Support form.
                        </div>

                    </div>

                </div>

            `,
        };


        // =====================================================
        // SEND EMAIL
        // =====================================================

        await transporter.sendMail(
            mailOptions
        );


        // =====================================================
        // RESPONSE
        // =====================================================

        return res.status(200).json({
            success: true,
            message:
                "Support request sent successfully.",
        });


    } catch (error) {

        console.error(
            "Support Email Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to send support request.",
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
    sendSupportEmail,
};