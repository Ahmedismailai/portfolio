const asyncHandler = require("express-async-handler");
const Testimonial = require("../models/testimonial.model");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(100).lean();

  res.json({
    success: true,
    testimonials,
  });
});

exports.createTestimonial = asyncHandler(async (req, res) => {
  const { name, role, text, rating } = req.body;

  let image = {
    url: "",
    public_id: "",
  };

  if (req.file) {
    const result = await uploadToCloudinary(
      req.file.buffer,
      "portfolio/testimonials",
    );

    image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const testimonial = await Testimonial.create({
    name,
    role,
    text,
    rating,
    image,
  });

  res.status(201).json({
    success: true,
    testimonial,
  });
});

exports.updateTestimonial = asyncHandler(async (req, res) => {
  const { name, role, text, rating } = req.body;

  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  testimonial.name = name || testimonial.name;
  testimonial.role = role || testimonial.role;
  testimonial.text = text || testimonial.text;
  testimonial.rating = rating || testimonial.rating;

  if (req.file) {
    if (testimonial.image?.public_id) {
      await cloudinary.uploader.destroy(testimonial.image.public_id);
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "portfolio/testimonials",
    );

    testimonial.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  await testimonial.save();

  res.json({
    success: true,
    testimonial,
  });
});

exports.deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  if (testimonial.image?.public_id) {
    await cloudinary.uploader.destroy(testimonial.image.public_id);
  }

  await testimonial.deleteOne();

  res.json({
    success: true,
    message: "Testimonial deleted successfully",
  });
});
