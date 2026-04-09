import dotenv from 'dotenv';

dotenv.config();

export const AppConfig = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3007', 10),
    serviceName: process.env.SERVICE_NAME || 'notification-service',

    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',

    logLevel: process.env.LOG_LEVEL || 'info',

    retry: {
        maxAttempts: parseInt(process.env.MAX_RETRY_ATTEMPTS || '3', 10),
        delayMs: parseInt(process.env.RETRY_DELAY_MS || '5000', 10),
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'your-jwt-secret',
        issuer: process.env.JWT_ISSUER || 'api-gateway',
    },
};