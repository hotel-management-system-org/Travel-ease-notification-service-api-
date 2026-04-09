import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export class DatabaseConfig {
    private static instance: DatabaseConfig;

    private constructor() {}

    public static getInstance(): DatabaseConfig {
        if (!DatabaseConfig.instance) {
            DatabaseConfig.instance = new DatabaseConfig();
        }
        return DatabaseConfig.instance;
    }

    public async connect(): Promise<void> {
        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/travel_ease_notification_db';

            await mongoose.connect(mongoUri, {
                maxPoolSize: 10,
                minPoolSize: 5,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });

            logger.info('✅ MongoDB Connected Successfully');

            mongoose.connection.on('error', (error) => {
                logger.error('MongoDB Connection Error:', error);
            });

            mongoose.connection.on('disconnected', () => {
                logger.warn('MongoDB Disconnected');
            });

        } catch (error) {
            logger.error('❌ MongoDB Connection Failed:', error);
            process.exit(1);
        }
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect();
        logger.info('MongoDB Disconnected');
    }
}

export const databaseConfig = DatabaseConfig.getInstance();