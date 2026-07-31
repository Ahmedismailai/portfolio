const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const compression = require("compression");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const skillRoutes = require("./routes/skill.routes");
const experienceRoutes = require("./routes/experience.routes");
const serviceRoutes = require("./routes/service.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const contactRoutes = require("./routes/contact.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const settingRoutes = require("./routes/setting.routes");
const resumeRoutes = require("./routes/resume.routes");
const blogRoutes = require("./routes/blog.routes");
const activityRoutes = require("./routes/activity.routes");
const notificationRoutes = require("./routes/notification.routes");
const subscriberRoutes = require("./routes/subscriber.routes");
const workWithRoutes = require("./routes/workWith.routes");
const seoRoutes = require("./routes/seo.routes");
const homeRoutes = require("./routes/home.routes");

const { sanitizeRequest } = require("./middleware/sanitize.middleware");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.disable("x-powered-by");

if (process.env.TRUST_PROXY) {
  const trustProxy = Number(process.env.TRUST_PROXY);
  app.set("trust proxy", Number.isNaN(trustProxy) ? process.env.TRUST_PROXY : trustProxy);
}

const defaultAllowed = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://portfolio-ai-rosy-eta.vercel.app",
];

const allowedOrigins = Array.from(
  new Set([
    ...defaultAllowed,
    ...(process.env.FRONTEND_URL || "")
      .split(",")
      .map((origin) => origin.trim().replace(/\/$/, ""))
      .filter(Boolean),
  ]),
);

const corsOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
    callback(null, true);
    return;
  }

  const error = new Error("Origin is not allowed");
  error.statusCode = 403;
  callback(error);
};

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(compression());
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(hpp());
app.use(sanitizeRequest);

const createLimiter = (options) =>
  rateLimit({
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ...options,
  });

app.use(
  "/api",
  createLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    message: { success: false, message: "Too many requests. Try again later." },
  }),
);

app.use(
  "/api/auth/login",
  createLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    skipSuccessfulRequests: true,
    message: { success: false, message: "Too many login attempts. Try again later." },
  }),
);

const publicWriteLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 8,
  skip: (req) => req.method !== "POST",
  message: { success: false, message: "Too many submissions. Try again later." },
});

app.use("/api/contact", publicWriteLimiter);
app.use("/api/subscribers", publicWriteLimiter);

const cacheablePaths = [
  "/api/home",
  "/api/projects",
  "/api/skills",
  "/api/experience",
  "/api/services",
  "/api/testimonials",
  "/api/settings",
  "/api/resume",
  "/api/work-with",
  "/api/seo",
];

app.use((req, res, next) => {
  const isPublicBlog =
    req.path === "/api/blogs/published" ||
    (req.path.startsWith("/api/blogs/") && req.path !== "/api/blogs/");
  const isCacheable = cacheablePaths.includes(req.path) || isPublicBlog;

  if (req.method === "GET" && isCacheable) {
    res.set("Cache-Control", "public, max-age=30, s-maxage=120, stale-while-revalidate=600");
  }

  next();
});

app.get("/health", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.status(200).json({ success: true, status: "ok", database: states[mongoose.connection.readyState] || "unknown" });
});

app.get("/ready", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ success: connected, status: connected ? "ready" : "not-ready" });
});

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Portfolio API Running" });
});

app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/work-with", workWithRoutes);
app.use("/api/seo", seoRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
