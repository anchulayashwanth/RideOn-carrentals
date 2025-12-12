import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const debugAuth = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected.");

        const email = "guru@gmail.com";
        const passwordAttempt = "123456";

        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found.");
            process.exit(1);
        }

        console.log(`\nUser: ${user.email}`);
        console.log(`Stored Hash: ${user.password}`);

        // Test 1: Compare directly
        const isMatch = await bcrypt.compare(passwordAttempt, user.password);
        console.log(`\nTest 1 - Direct Compare ('${passwordAttempt}' vs stored hash): ${isMatch}`);

        // Test 2: Manually hash and see what it looks like
        const testHash = await bcrypt.hash(passwordAttempt, 10);
        console.log(`Test 2 - New Hash of '${passwordAttempt}': ${testHash}`);
        const isMatchNew = await bcrypt.compare(passwordAttempt, testHash);
        console.log(`       - Does new hash match input? ${isMatchNew}`);

        if (isMatch) {
            console.log("\n✅ CONCLUSION: Stored hash IS VALID for '123456'. Problem is likely in the API request handling (trimming, body parsing, etc).");
        } else {
            console.log("\n❌ CONCLUSION: Stored hash is INVALID. The reset process is flawed.");
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

debugAuth();
