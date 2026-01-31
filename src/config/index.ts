import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env") });

interface Config {
  NODE_ENV: string;
  port: number;
  database_url: string;
  bcrypt_salt_rounds: number;
  jwt_access_secret: string;
  jwt_refresh_secret: string;
  jwt_access_expires_in: string;
  jwt_refresh_expires_in: string;
  default_admin_password: string;
}

const config: Config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),
  database_url:
    process.env.DATABASE_URL ||
    "mongodb://localhost:27017/sports-facility-booking",
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10),
  jwt_access_secret: process.env.JWT_ACCESS_SECRET || "your_jwt_access_secret",
  jwt_refresh_secret:
    process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret",
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "7d",
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD || "admin@123",
};

export default config;
