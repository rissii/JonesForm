const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) {
  let mailOptions = {
    from: `${req.body.values.email}`,
    to: process.env.EMAIL,
    subject: `New Lead`,
    text: 
    `
    FirstName: ${req.body.values.firstName}
    LastName: ${req.body.values.lastName }
    Mail Adress: ${req.body.values.email }
    Phone Number: ${req.body.values.phoneNumber }`
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
      res.json({ status: "Email sent" });
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
