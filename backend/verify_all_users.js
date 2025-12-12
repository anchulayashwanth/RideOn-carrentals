import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const verifyUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected.");

        const usersToCheck = [
            { email: "guru@gmail.com", password: "123456" },
            { email: "man@gmail.com", password: "man@123" }
        ];

        for (const u of usersToCheck) {
            console.log(`\nChecking ${u.email}...`);
            const user = await User.findOne({ email: u.email });

            if (!user) {
                console.log("❌ User NOT FOUND.");
                continue;
            }

            const isMatch = await bcrypt.compare(u.password, user.password);
            if (isMatch) {
                console.log(`✅ Login SUCCESS (Password correct).`);
            } else {
                console.log(`❌ Login FAILED (Password mismatch).`);
                console.log(`   Stored hash: ${user.password}`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

verifyUsers();
