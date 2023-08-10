import nodemailer from "nodemailer";
import { mailConfig } from "./mailConfig";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "mack.stehr5@ethereal.email",
    pass: "nQaYynM8x35sUUsRky",
  },
});

const sendEmail = (option: any) => {
  transporter.sendMail(option, (err, info) => {
    console.log("soshal", info);
    if (err) {
      console.log("dahal", err);
    }
  });
};

export default sendEmail;
