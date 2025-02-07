import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@google-tranlate-clone.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

if (!connectionString) {
  throw new Error(
    "Please define the MONGO_DB_USERNAME and MONGO_DB_PASSWORD environment variables inside .env file"
  );
}

const connectDB = async () => {
  // console.log(">>> Connecting to database", mongoose.connection);
  if (mongoose.connection?.readyState >= 1) {
    console.log(">>>>>> Already connected to database  >>>>>>>>");
    return;
  }

  try {
    await mongoose.connect(connectionString);
    console.log(">>>>>> Connected to database  >>>>>>>>");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

export default connectDB;
