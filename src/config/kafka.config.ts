export const kafkaConfig = {
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    clientId: process.env.KAFKA_CLIENT_ID || 'notification-service',
    groupId: process.env.KAFKA_GROUP_ID || 'notification-service-group',

    consumer: {
        sessionTimeout: parseInt(process.env.KAFKA_CONSUMER_SESSION_TIMEOUT || '3000',10),
        heartbeatInterval: parseInt(process.env.KAFKA_CONSUMER_HEARTBEAT_INTERVAL || '3000',10),
        allowAutoTopicCreation: false,
        retry: {
            initialRetryTime: 100,
            retries: 8,
        }
    },

    topics:{
        bookingCreated: process.env.TOPIC_BOOKING_CREATED || 'booking-created',
        bookingConfirmed: process.env.TOPIC_BOOKING_CONFIRMED || 'booking-confirmed',
        bookingCancelled: process.env.TOPIC_BOOKING_CANCELLED || 'booking-cancelled',
        paymentSuccess: process.env.TOPIC_PAYMENT_SUCCESS || 'payment-success',
        paymentFailed: process.env.TOPIC_PAYMENT_FAILED || 'payment-failed',
        otpSend: process.env.TOPIC_OTP_SEND || 'otp-send',
        userCreated: process.env.TOPIC_USER_CREATE || 'user.created',
        dlq: process.env.TOPIC_DLQ || 'notification-dlq',
    }

}