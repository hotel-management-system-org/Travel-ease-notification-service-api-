import { createApp } from './index';
import { AppConfig } from './config/app.config';
import { kafkaClient } from './kafka/kafka.client';
import { UserConsumer } from './kafka/consumers/user.consumer';
import { logger } from './utils/logger';
import { EachMessagePayload } from 'kafkajs';
import {databaseConfig} from "./config/database.config";
import {kafkaConfig} from "./config/kafka.config";
import {BookingConsumer} from "./kafka/consumers/booking.consumer";
import {PaymentConsumer} from "./kafka/consumers/payment.consumer";

async function startServer() {
    try {
        await databaseConfig.connect();
        await kafkaClient.connect();

        const topics = [
            kafkaConfig.topics.bookingCreated,
            kafkaConfig.topics.bookingConfirmed,
            kafkaConfig.topics.bookingCancelled,
            kafkaConfig.topics.paymentSuccess,
            kafkaConfig.topics.paymentFailed,
            kafkaConfig.topics.otpSend,
            kafkaConfig.topics.userCreated,
        ];
        await kafkaClient.subscribe(topics);

        // 4. Initialize consumers
/*
        const paymentConsumer = new PaymentConsumer();
*/
        const userConsumer = new UserConsumer();
        const bookingConsumer = new BookingConsumer();
        const paymentConsumer = new PaymentConsumer();


        await kafkaClient.consume(async (payload: EachMessagePayload) => {
            const { topic } = payload;

            switch (topic) {

                case kafkaConfig.topics.paymentSuccess:
                    await paymentConsumer.handelMessageSuccessPayment(payload);
                    break;
                case kafkaConfig.topics.paymentFailed:
                    await paymentConsumer.handelMessageFailedPayment(payload);
                    break;

                case kafkaConfig.topics.bookingCreated:
                    await bookingConsumer.handleMessageCreateBooking(payload);
                    break
                case kafkaConfig.topics.bookingConfirmed:
                    await bookingConsumer.handleMessageConfirmedBooking(payload);
                    break
                case kafkaConfig.topics.bookingCancelled:
                    await bookingConsumer.handleMessageCancelledBooking(payload);
                    break


                case kafkaConfig.topics.otpSend:
                    await userConsumer.handleMessage(payload);
                    break;

                default:
                    logger.warn(`Unknown topic: ${topic}`);
            }
        });

        const app = createApp();
        app.listen(AppConfig.port, () => {
            logger.info(`🚀 Notification Service is running on port ${AppConfig.port}`);
            logger.info(`📡 Kafka Consumer is ACTIVE and listening...`);
        });

        process.on('SIGTERM', async () => {
            logger.info('SIGTERM received, shutting down gracefully...');
            await kafkaClient.disconnect();
            await databaseConfig.disconnect();
            process.exit(0);
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();