const getEmailTemplate = ({ name, branchName, email, password }) => {
    return {
        subject: `${branchName} | Account Login Details`,
        text: `Dear ${name},\n\nWe are pleased to inform you that your account has been successfully created with ${branchName}.\n\nLogin Credentials:\n📧 Email: ${email}\n🔑 Password: ${password}\n\nFor security reasons, please do not share your password with anyone.\nIf you require any assistance, please contact your branch administrator.\n\nKind regards,\n${branchName} Team`,
        html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; padding: 30px 15px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">

                <!-- Header -->
                <div style="background-color: #ea580c; padding: 24px 20px; text-align: center;">
                    <h2 style="color: #1a1a1a; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">${branchName}</h2>
                    <p style="color: #374151; margin: 6px 0 0; font-size: 14px; font-weight: 500;">
                        Cloth & Shoes Store Management
                    </p>
                </div>

                <!-- Body -->
                <div style="padding: 32px 30px; color: #374151; font-size: 15px; line-height: 1.6;">

                    <p style="margin: 0 0 16px 0;">Dear <b>${name}</b>,</p>

                    <p style="margin: 0 0 24px 0;">
                        We are pleased to inform you that your account has been successfully created with <b>${branchName}</b>.
                    </p>

                    <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 18px 20px; border-radius: 10px; margin: 0 0 24px 0;">
                        <p style="margin: 0 0 12px 0; font-weight: bold; color: #1f2937; font-size: 15px;">Login Credentials</p>
                        <p style="margin: 0 0 8px 0;">
                            📧 Email: <a href="mailto:${email}" style="color: #1d4ed8; text-decoration: underline; font-weight: bold;">${email}</a>
                        </p>
                        <p style="margin: 0;">
                            🔑 Password: <span style="color: #16a34a; font-weight: bold;">${password}</span>
                        </p>
                    </div>

                    <p style="color: #ef4444; font-size: 14px; margin: 0 0 18px 0;">
                        For security reasons, please do not share your password with anyone.
                    </p>

                    <p style="margin: 0 0 28px 0; color: #4b5563;">
                        If you require any assistance, please contact your branch administrator.
                    </p>

                    <p style="margin: 0; color: #4b5563;">
                        Kind regards,<br/>
                        <b style="color: #111827;">${branchName} Team</b>
                    </p>
                </div>

            </div>
        </div>
        `
    }
}

module.exports = getEmailTemplate
