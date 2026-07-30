const asyncHandler = require("express-async-handler");
const Setting = require("../models/setting.model");

const defaultSetting = () => new Setting().toObject();
const textFields = [
  "siteName",
  "siteDescription",
  "heroEyebrow",
  "heroGreeting",
  "heroName",
  "heroTitle",
  "heroDescription",
  "heroSecondaryCtaText",
  "resumeUrl",
  "aboutBadge",
  "aboutTitle",
  "aboutBio",
  "aboutExpYears",
  "aboutProjectsCount",
  "aboutClientsCount",
  "aboutTechCount",
  "email",
  "phone",
  "location",
  "footerText",
  "theme",
];
const heroCardFields = [
  "card1Title",
  "card1Subtitle",
  "card2Title",
  "card2Subtitle",
  "card3Title",
  "card3Subtitle",
  "card4Title",
  "card4Subtitle",
];
const socialFields = ["github", "linkedin", "facebook", "twitter", "instagram"];

exports.getSettings = asyncHandler(async (req, res) => {
  const setting = (await Setting.findOne().lean()) || defaultSetting();
  res.json({ success: true, setting });
});

exports.updateSettings = asyncHandler(async (req, res) => {
  let setting = await Setting.findOne();
  if (!setting) setting = new Setting();

  for (const field of textFields) {
    const sourceField = field === "location" && req.body.address !== undefined ? "address" : field;
    if (req.body[sourceField] !== undefined) {
      setting[field] = req.body[sourceField].toString().trim();
    }
  }

  const currentCards = setting.heroCards?.toObject?.() || setting.heroCards || {};
  setting.heroCards = {
    ...currentCards,
    ...Object.fromEntries(
      heroCardFields
        .filter((field) => req.body[field] !== undefined)
        .map((field) => [field, req.body[field].toString().trim()]),
    ),
  };

  if (req.body.logo !== undefined) {
    setting.logo = {
      ...(setting.logo?.toObject?.() || setting.logo || {}),
      url: req.body.logo.toString().trim(),
    };
  }

  if (req.body.heroImage !== undefined) {
    setting.heroImage = {
      ...(setting.heroImage?.toObject?.() || setting.heroImage || {}),
      url: typeof req.body.heroImage === "string" ? req.body.heroImage.trim() : (req.body.heroImage?.url || "").trim(),
    };
  }

  const currentLinks = setting.socialLinks?.toObject?.() || setting.socialLinks || {};
  setting.socialLinks = {
    ...currentLinks,
    ...Object.fromEntries(
      socialFields
        .filter((field) => req.body[field] !== undefined)
        .map((field) => [field, req.body[field].toString().trim()]),
    ),
  };

  await setting.save();
  res.json({ success: true, message: "Settings updated successfully", setting });
});
