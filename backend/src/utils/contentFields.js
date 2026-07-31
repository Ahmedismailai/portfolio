const parseTags = (value) => {
  if (value === undefined || value === null || value === "") return [];

  let tags = value;
  if (!Array.isArray(tags)) {
    try {
      const parsed = JSON.parse(tags);
      tags = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      tags = String(tags).split(",");
    }
  }

  return Array.from(
    new Set(tags.map((tag) => String(tag).trim()).filter(Boolean)),
  ).slice(0, 20);
};

const parseBoolean = (value) => value === true || value === "true";

const cleanText = (value) =>
  value === undefined || value === null ? undefined : String(value).trim();

module.exports = { cleanText, parseBoolean, parseTags };
