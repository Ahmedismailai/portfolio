const asyncHandler = require("express-async-handler");
const SEO = require("../models/seo.model");

const allowedFields = ["metaTitle", "metaDescription", "metaKeywords", "siteUrl"];

exports.getSEO = asyncHandler(async (req, res) => {
  const seo = (await SEO.findOne().lean()) || new SEO().toObject();
  res.json({ success: true, seo });
});

exports.updateSEO = asyncHandler(async (req, res) => {
  let seo = await SEO.findOne();
  if (!seo) seo = new SEO();

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      seo[field] = req.body[field].toString().trim();
    }
  }

  await seo.save();
  res.json({ success: true, seo });
});
