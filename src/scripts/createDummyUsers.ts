import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { config } from "../config";

export const initializeDummyUsers = async () => {
  try {
    // Check if users already exist
    const existingUsers = await User.find({});

    if (existingUsers.length === 0) {
      console.log("No existing users found. Creating dummy users...");

      // Create admin user
<<<<<<< HEAD
      const adminPassword = await bcrypt.hash("admin123", 10);
=======
      const adminPassword = await bcrypt.hash(
        config.defaultAdminPassword,
        config.bcryptSaltRounds
      );
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
      await User.create({
        username: "admin",
        password: adminPassword,
        role: "admin",
        name: "System Admin",
        contactNumber: "1234567890",
        location: "Head Office",
      });
      console.log("✓ Admin user created successfully");

      // Create staff user
<<<<<<< HEAD
      const staffPassword = await bcrypt.hash("staff123", 10);
=======
      const staffPassword = await bcrypt.hash(
        config.defaultStaffPassword,
        config.bcryptSaltRounds
      );
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
      await User.create({
        username: "staff",
        password: staffPassword,
        role: "staff",
        name: "Test Staff",
        contactNumber: "9876543210",
        location: "Branch Office",
      });
      console.log("✓ Staff user created successfully");

<<<<<<< HEAD
      console.log("\nTest credentials:");
      console.log("Admin - username: admin, password: admin123");
      console.log("Staff - username: staff, password: staff123");
    } else {
      console.log("✓ Default users already exist in the database");
    }
  } catch (error) {
    console.error("❌ Error initializing dummy users:", error);
=======
      console.log("✓ Dummy users created successfully");
    } else {
      console.log(
        "Users already exist in the database. Skipping dummy user creation."
      );
    }
  } catch (error) {
    console.error("Error creating dummy users:", error);
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
    throw error;
  }
};

// Keep the standalone script functionality for manual runs
if (require.main === module) {
  mongoose
    .connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/milk-farm-crm"
    )
    .then(() => initializeDummyUsers())
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
