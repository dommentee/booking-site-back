import nodemailer from "nodemailer";
import { nodeMailerConfig } from "./nodeMailerConfig";

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  let testAccount = nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodeMailerConfig);

  return transporter.sendMail({
    from: '"Mentee-Fresh Designs & Services" <chuku0929@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};
