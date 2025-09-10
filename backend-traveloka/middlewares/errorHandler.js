async function errorHandling(err, req, res, next) {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = err.errors.map((el) => el.message);
    res.status(400).json({ message: errors[0] });
  } else if (err.name === "REGISTER_FIELDS_REQUIRED") {
    res.status(400).json({ message: "All fields are required" });
  } else if (err.name === "REGISTER_USERNAME_ALREADY_EXISTS") {
    res.status(400).json({ message: "Username already exists" });
  } else if (err.name === "REGISTER_EMAIL_ALREADY_EXISTS") {
    res.status(400).json({ message: "Email already exists" });
  } else if (err.name === "REGISTER_PHONE_NUMBER_ALREADY_EXISTS") {
    res.status(400).json({ message: "Phone number already exists" });
  } else if (err.name === "MISSING_TOKEN") {
    res.status(401).json({ message: "Missing access token" });
  } else if (err.name === "USER_NOT_FOUND") {
    res.status(404).json({ message: "User not found" });
  } else if (err.name === "EMAIL_ALREADY_VERIFIED") {
    res.status(400).json({ message: "Email already verified" });
  } else if (err.name === "LOGIN_FIELDS_REQUIRED") {
    res
      .status(400)
      .json({ message: "Email/Username and Password are required" });
  } else if (err.name === "LOGIN_EMAIL_PASSWORD_INVALID") {
    res.status(400).json({ message: "Invalid email/username or password" });
  } else if (err.name === "LOGIN_USER_NOT_VERIFIED") {
    res.status(401).json({ message: "Please verify your email first" });
  } else if (err.name === "UNAUTHORIZED") {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
    errorHandling,
};

// REGISTER_FIELDS_REQUIRED
// REGISTER_USERNAME_ALREADY_EXISTS
// REGISTER_EMAIL_ALREADY_EXISTS
// REGISTER_PHONE_NUMBER_ALREADY_EXISTS

// MISSING_TOKEN
// USER_NOT_FOUND
// EMAIL_ALREADY_VERIFIED

// LOGIN_FIELDS_REQUIRED
// LOGIN_EMAIL_PASSWORD_INVALID
// LOGIN_USER_NOT_VERIFIED

// UNAUTHORIZED
