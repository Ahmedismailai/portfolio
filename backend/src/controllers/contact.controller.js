const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const Contact = require("../models/contact.model");
const createNotification = require("../utils/createNotification");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value, max) => value?.toString().trim().slice(0, max) || "";
const escapeHtml = (value) =>
  value.replace(/[&<>'"]/g, (character) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
    return entities[character];
  });

exports.sendContactMessage = asyncHandler(async (req, res) => {
  const name = clean(req.body.name, 100);
  const email = clean(req.body.email, 254).toLowerCase();
  const subject = clean(req.body.subject, 150) || "New Portfolio Message";
  const message = clean(req.body.message, 5000);

  if (!name || !emailPattern.test(email) || !message) {
    res.status(400);
    throw new Error("Name, a valid email, and message are required");
  }

  const contact = await Contact.create({ name, email, subject, message });

  await createNotification({
    title: "New Contact Message",
    message: `${name} sent you a message`,
    type: "info",
  });

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6">
            <h2>New Contact Message</h2>
            <p><b>Name:</b> ${escapeHtml(name)}</p>
            <p><b>Email:</b> ${escapeHtml(email)}</p>
            <p><b>Subject:</b> ${escapeHtml(subject)}</p>
            <p><b>Message:</b></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          </div>`,
      });
    } catch (error) {
      console.error("Email send failed:", error.message);
    }
  }

  res.status(201).json({ success: true, message: "Message sent successfully" });
});

exports.getContactMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 }).limit(500).lean();
  res.json({ success: true, messages });
});

exports.deleteContactMessage = asyncHandler(async (req, res) => {
  const message = await Contact.findById(req.params.id);
  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  await message.deleteOne();
  res.json({ success: true, message: "Message deleted successfully" });
});
