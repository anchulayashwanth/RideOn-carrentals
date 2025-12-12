import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const debugUser = async () => {
    try {
        console.log("Attempting to connect to DB...");
        console.log("URI:", process.env.MONGODB_URI); // Log URI to be sure (be careful with secrets, but this is local debug)

        const explicitURI = "mongodb://anchulayeswanth9_db_user:sq0aOyP0WRxQXqK9@ac-ulig1z4-shard-00-00.vazkoy7.mongodb.net:27017/rideon?ssl=true&authSource=admin&retryWrites=true&w=majority&directConnection=true";
        console.log("Using Explicit URI:", explicitURI);
        await mongoose.connect(explicitURI);
        console.log("✅ Connected to MongoDB successfully.");

        const email = "guru@gmail.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ User ${email} NOT found in the database.`);
        } else {
            console.log(`✅ User found: ${user.email}`);
            console.log(`   ID: ${user._id}`);
            console.log(`   Hashed Password: ${user.password}`);
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

debugUser();
