import dotenv from "dotenv";

dotenv.config();

<<<<<<< HEAD
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is required");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
=======
// Required environment variables
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "PORT"] as const;
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} environment variable is required`);
  }
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
}

export const config = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
<<<<<<< HEAD
  jwtExpiration: "24h",
=======
  port: process.env.PORT || 5000,
  jwtExpiration: process.env.JWT_EXPIRATION || "24h",
  nodeEnv: process.env.NODE_ENV || "development",
  apiBaseUrl: process.env.CLIENT_URL || "http://localhost:3000",

  // Default passwords
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD || "admin123",
  defaultStaffPassword: process.env.DEFAULT_STAFF_PASSWORD || "staff123",
  minPasswordLength: parseInt(process.env.MIN_PASSWORD_LENGTH || "6"),

  // Default user settings
  defaultRole: process.env.DEFAULT_ROLE || "staff",
  defaultShift: process.env.DEFAULT_SHIFT || "AM",

  // Security settings
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
};
