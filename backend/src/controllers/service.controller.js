const asyncHandler = require("express-async-handler");
const Service = require("../models/service.model");

exports.getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 }).limit(100).lean();

  res.json({
    success: true,
    services,
  });
});

exports.createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    service,
  });
});

exports.updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  res.json({
    success: true,
    service,
  });
});

exports.deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  await service.deleteOne();

  res.json({
    success: true,
    message: "Service deleted successfully",
  });
});
