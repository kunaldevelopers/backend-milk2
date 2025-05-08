import { Schema, model, Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import { getSetting } from "./Settings";
<<<<<<< HEAD
=======
import { config } from "../config";
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c

interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  role: string;
  contactNumber?: string;
  location?: string;
  profilePhoto?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
<<<<<<< HEAD
    password: { type: String, required: true },
=======
    password: {
      type: String,
      required: true,
      minlength: config.minPasswordLength,
    },
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
    name: { type: String, required: true },
    role: { type: String, required: true },
    contactNumber: String,
    location: String,
    profilePhoto: String,
  },
  {
    timestamps: true,
  }
);

// Add method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Add validation for roles
userSchema.pre("validate", async function (next) {
  try {
    // Validate role against settings
    const roles = await getSetting("roles");
    if (roles && Array.isArray(roles) && !roles.includes(this.role)) {
<<<<<<< HEAD
      const err = new Error(`Role must be one of: ${roles.join(", ")}`);
      return next(err);
    }

    next();
  } catch (error) {
    // Cast error to CallbackError type for Mongoose middleware
=======
      next(new Error(`Invalid role. Must be one of: ${roles.join(", ")}`));
    } else {
      next();
    }
  } catch (error) {
    next(error as CallbackError);
  }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // Validate password length
    if (this.password.length < config.minPasswordLength) {
      throw new Error(
        `Password must be at least ${config.minPasswordLength} characters long`
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      this.password,
      config.bcryptSaltRounds
    );
    this.password = hashedPassword;
    next();
  } catch (error) {
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
    next(error as CallbackError);
  }
});

export const User = model<IUser>("User", userSchema);
