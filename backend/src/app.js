require("dotenv").config();
const path = require("path");

const express = require("express");
require("express-async-errors");

const app = express();

// extra security packages
const helmet = require("helmet");
const cors = require('cors');
const xss = require('xss')
const rateLimit = require('express-rate-limit');

// authentication middleware
const authenticateUser = require("./middleware/authentication");

// connectDB
const connectDB = require("./config/db");

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: { msg: "Too many requests, slow down!" },
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})

app.set('trust proxy', 1);

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "*", // allow requests from this origin (the frontend) "http://localhost:5173"
      credentials: true
    })
  );
} // enables CORS for all routes

app.use(helmet()); // sets various HTTP headers to help protect the app

app.use(express.json()); // used in the case of a post method so as to have access to req.body

app.use((req, res, next) => {
  for (let key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = xss(req.body[key]);
    }
  }
  next();
}); // sanitizes the input to prevent XSS attacks

// routes
app.use("/api/v1/auth", authRouter);
// Apply the rate limiting middleware to the jobs routes.
app.use("/api/v1/jobs", authenticateUser, limiter, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


// module.exports = app;
