const { createMailTransporter } = require("./createMailTransporter");

const sendVerificationMail = (user) => {
    const transporter = createMailTransporter();
    
    const mailOptions = {
        from: '"PETPALS" <tartori_dev@outlook.com>',
        to: user.email,
        subject: "Verify your email...",
        html: `<p>Good day adopter ${user.name}, verify your email by clicking this link... 
        <a href="http://127.0.0.1:5173/verify-email?emailToken=${user.emailToken}">Verify Your Email</a></p>`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Verification email sent");
      }
    });
};

module.exports = { sendVerificationMail };
