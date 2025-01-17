// import mongoose from "mongoose";
// const connectDB = async () => {
//     try {
//       const conn = await mongoose.connect(`mongodb://localhost:27017/getmeachai`, {
//         useNewUrlParser: true,
//       });
//       console.log(`MongoDB Connected: {conn.connection.host}`);
//     } catch (error) {
//       console.error(error.message);
//       process.exit(1);
//     }
//   }

// export default connectDB
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Use current connection
    return;
  }
  // Use new db connection
  await mongoose.connect("mongodb://localhost:27017/getmeachai", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  });
  console.log('MongoDB connected');
};

export default connectDB;