import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "noreply.notex@gmail.com",
        pass: process.env.GMP,
    },
});