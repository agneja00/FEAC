import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

interface IEmail {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const sendEmail = ({ to, from, subject, text, html }: IEmail) => {
  const msg = { to, from, subject, text, html };
  return sgMail.send(msg);
};

export default sendEmail;
