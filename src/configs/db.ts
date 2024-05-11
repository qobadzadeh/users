import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/users';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (error) {
        process.exit(1);
    }
};

export default connectDB;
