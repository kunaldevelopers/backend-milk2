import { Request, Response } from "express";
<<<<<<< HEAD
import jwt from "jsonwebtoken";
=======
import jwt, { SignOptions } from "jsonwebtoken";
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Staff } from "../models/Staff";
import { config } from "../config";
import mongoose, { Document, Types } from "mongoose";
import { IUser, IUserPayload } from "../types";

interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  role: "admin" | "staff";
  name?: string;
<<<<<<< HEAD
}

=======
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Helper function to ensure correct expiration format
const getExpiration = (exp?: string): string => {
  if (!exp) return "24h";
  // Validate that exp matches jwt format like 1h, 2d, 7d, etc.
  const validFormat = /^\d+[hdwmy]$/i.test(exp);
  return validFormat ? exp : "24h";
};

// Helper function to sign JWT token
const signToken = (payload: IUserPayload): string => {
  if (!config.jwtSecret) {
    throw new Error("JWT secret is not configured");
  }

  const options = {
    expiresIn: getExpiration(config.jwtExpiration),
  } as SignOptions;

  return jwt.sign(payload, Buffer.from(config.jwtSecret), options);
};

>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log(`[AUTH DEBUG] Login attempt for username: ${username}`);

<<<<<<< HEAD
    // Explicitly type user with UserDocument interface
=======
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
    const user = (await User.findOne({ username })) as UserDocument | null;

    if (!user) {
      console.log(`[AUTH DEBUG] User not found: ${username}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log(`[AUTH DEBUG] Invalid password for user: ${username}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If this is a staff user, ensure they have a staff record
    if (user.role === "staff") {
      console.log(`[AUTH DEBUG] Checking staff record for user: ${user._id}`);
<<<<<<< HEAD

      // Try different methods to find the staff record
      let existingStaff = await Staff.findOne({ userId: user._id });

      if (!existingStaff) {
        // Try string comparison as fallback
        existingStaff = await Staff.findOne({
          $expr: {
            $eq: [{ $toString: "$userId" }, user._id.toString()],
          },
=======
      let existingStaff = await Staff.findOne({ userId: user._id });

      if (!existingStaff) {
        existingStaff = await Staff.findOne({
          $expr: { $eq: [{ $toString: "$userId" }, user._id.toString()] },
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
        });
      }

      if (!existingStaff) {
        console.log(
          `[AUTH DEBUG] Creating new staff record for user: ${user._id}`
        );
        try {
          const newStaff = new Staff({
            userId: new Types.ObjectId(user._id.toString()),
            name: user.name || user.username,
<<<<<<< HEAD
            shift: "AM", // Default shift
=======
            shift: config.defaultShift,
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
            assignedClients: [],
            isAvailable: true,
            totalMilkQuantity: 0,
          });
          await newStaff.save();
<<<<<<< HEAD
          console.log(
            `[AUTH DEBUG] Created staff record with ID: ${newStaff._id}`
          );
=======
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
        } catch (staffError) {
          console.error(
            `[AUTH DEBUG] Error creating staff record:`,
            staffError
          );
          return res.status(500).json({
            message: "Error creating staff record",
            error:
              staffError instanceof Error
                ? staffError.message
                : "Unknown error",
          });
        }
<<<<<<< HEAD
      } else {
        console.log(
          `[AUTH DEBUG] Found existing staff record: ${existingStaff._id}`
        );
        // Ensure userId is correct format
        if (existingStaff.userId.toString() !== user._id.toString()) {
          existingStaff.userId = new Types.ObjectId(user._id.toString());
          await existingStaff.save();
          console.log(
            `[AUTH DEBUG] Updated staff record userId to: ${user._id}`
          );
        }
      }
    }

    // Create properly typed token payload
=======
      } else if (existingStaff.userId.toString() !== user._id.toString()) {
        existingStaff.userId = new Types.ObjectId(user._id.toString());
        await existingStaff.save();
      }
    }

>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
    const tokenPayload: IUserPayload = {
      _id: user._id.toString(),
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
<<<<<<< HEAD
      name: user.name || undefined,
    };

    const token = jwt.sign(tokenPayload, config.jwtSecret, {
      expiresIn: "24h",
    });
=======
      name: user.name,
    };

    const token = signToken(tokenPayload);
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c

    console.log(`[AUTH DEBUG] Login successful for user: ${username}`);
    res.json({
      token,
      user: {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("[AUTH DEBUG] Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role, name } = req.body;

<<<<<<< HEAD
=======
    // Validate password length
    if (password.length < config.minPasswordLength) {
      return res.status(400).json({
        message: `Password must be at least ${config.minPasswordLength} characters`,
      });
    }

>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

<<<<<<< HEAD
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with proper type casting
    const user = (await User.create({
      username,
      password: hashedPassword,
      role: role || "staff",
      name,
    })) as UserDocument;

    // Create properly typed token payload
=======
    const hashedPassword = await bcrypt.hash(password, config.bcryptSaltRounds);

    // Fix: Ensure role is strictly typed
    const userRole = (role || config.defaultRole) as "admin" | "staff";

    const user = (await User.create({
      username,
      password: hashedPassword,
      role: userRole,
      name,
    })) as UserDocument;

>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c
    const tokenPayload: IUserPayload = {
      _id: user._id.toString(),
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
      name: user.name,
    };

<<<<<<< HEAD
    const token = jwt.sign(tokenPayload, config.jwtSecret, {
      expiresIn: "24h",
    });
=======
    const token = signToken(tokenPayload);
>>>>>>> d0d9e6c94d1455a154b337c416cd476000f0087c

    res.status(201).json({
      token,
      user: {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
