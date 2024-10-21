import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        // Check if MONGO_URI is defined
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        const conn = await mongoose.connect(mongoURI);
        console.log(`Database connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};
// Default export for ES modules
export default connectDB;
