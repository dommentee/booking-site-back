import { sendEmail } from "./sendEmail";

export const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}: {
  name: any;
  email: any;
  verificationToken: any;
  origin: any;
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clickign the following link : <a href="${verifyEmail}">Verify Email</a></p>`;
  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h1>Helo ${name}</h1> ${message}`,
  });
};
