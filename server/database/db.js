import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Chat Message Schema
const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['system', 'user', 'assistant']
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create Message Model
const Message = mongoose.model('Message', messageSchema);

export { connectDB, Message };
