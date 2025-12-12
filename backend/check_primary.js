import mongoose from "mongoose";

const hosts = [
    "ac-ulig1z4-shard-00-00.vazkoy7.mongodb.net",
    "ac-ulig1z4-shard-00-01.vazkoy7.mongodb.net",
    "ac-ulig1z4-shard-00-02.vazkoy7.mongodb.net"
];

const checkHost = async (host) => {
    try {
        const uri = `mongodb://anchulayeswanth9_db_user:sq0aOyP0WRxQXqK9@${host}:27017/rideon?ssl=true&authSource=admin&directConnection=true`;
        console.log(`Checking ${host}...`);

        // Short timeout to fail fast
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

        const admin = mongoose.connection.db.admin();
        const status = await admin.command({ isMaster: 1 });

        console.log(`${host} - isMaster: ${status.ismaster}`);

        await mongoose.disconnect();
        if (status.ismaster) return host;
    } catch (e) {
        console.log(`${host} - Error: ${e.message}`);
    }
    return null;
}

const findPrimary = async () => {
    for (const host of hosts) {
        const primary = await checkHost(host);
        if (primary) {
            console.log(`\n✅ FOUND PRIMARY: ${primary}`);
            process.exit(0);
        }
    }
    console.log("\n❌ No primary found.");
    process.exit(1);
}

findPrimary();
