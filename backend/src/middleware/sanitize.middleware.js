const forbiddenKeys = new Set(["__proto__", "prototype", "constructor"]);

const inspectValue = (value) => {
  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("$") || key.includes(".") || forbiddenKeys.has(key)) {
      const error = new Error("Request contains an invalid field name");
      error.statusCode = 400;
      throw error;
    }

    inspectValue(child);
  }
};

exports.sanitizeRequest = (req, res, next) => {
  try {
    inspectValue(req.body);
    inspectValue(req.query);
    inspectValue(req.params);
    next();
  } catch (error) {
    next(error);
  }
};
