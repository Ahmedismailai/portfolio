const Activity = require("../models/activity.model");

const logActivity = async ({ action, module, performedBy = "Admin", details }) => {
  try {
    await Activity.create({
      action,
      module,
      performedBy,
      details,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = logActivity;
