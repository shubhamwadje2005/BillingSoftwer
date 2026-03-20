const getEmailTemplate = ({ name, branchName, email, password }) => {
    return {
        subject: `${branchName} | Account Login Details`,
        html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f4f6f8; padding:30px">
            <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden">

                <!-- Header -->
                <div style="background:#ef6c00; padding:20px; text-align:center">
                    <h2 style="color:#333333; margin:0">${branchName}</h2>
                    <p style="color:#4b4f4f; margin:5px 0 0">
                        Cloth & Shoes Store Management
                    </p>
                </div>

                <!-- Body -->
                <div style="padding:30px; color:#333333">

                    <p style="font-size:15px">Dear <b>${name}</b>,</p>

                    <p style="line-height:1.6">
                        We are pleased to inform you that your account has been
                        successfully created with <b>${branchName}</b>.
                    </p>

                    <div style="background:#f9fafb; border:1px solid #e5e7eb; padding:15px; border-radius:6px; margin:20px 0">
                        <p style="margin:0 0 8px"><b>Login Credentials</b></p>
                        <p style="margin:0">
                            📧 Email: <b>${email}</b><br/>
                            🔑 Password: 
                            <span style="color:#16a34a; font-weight:600">${password}</span>
                        </p>
                    </div>

                  <p style="color:#ea4335; font-size:14px">
                      For security reasons, please do not share your password with anyone.
                  </p>


                    <p style="line-height:1.6">
                        If you require any assistance, please contact your branch administrator.
                    </p>

                    <p style="margin-top:30px">
                        Kind regards,<br/>
                        <b>${branchName} Team</b>
                    </p>
                </div>

                <!-- Footer -->
                <div style="background:#f3f4f6; text-align:center; padding:12px; font-size:12px; color:#6b7280">
                    © ${new Date().getFullYear()} ${branchName}. All rights reserved.
                </div>

            </div>
        </div>
        `
    }
}

module.exports = getEmailTemplate
