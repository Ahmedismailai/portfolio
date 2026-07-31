const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    image: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
