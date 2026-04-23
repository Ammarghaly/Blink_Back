export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).reduce((acc, e) => {
      acc[e.path] = [e.message];
      return acc;
    }, {});
    return res.status(400).json({ success: false, errors });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, message: "Token expired, please login again" });
  }

  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error("💥 UNHANDLED ERROR:", err);

  if (process.env.NODE_ENV === "development") {
    return res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong, please try again later",
  });
};
