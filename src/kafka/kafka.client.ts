import { Kafka, Consumer, Producer, EachMessagePayload, KafkaMessage } from 'kafkajs';
import { logger } from '../utils/logger';
import {kafkaConfig} from "../config/kafka.config";

export class KafkaClient {
    private static instance: KafkaClient;
    private kafka: Kafka;
    private consumer: Consumer;
    private producer: Producer;
    private isConnected = false;

    private constructor() {
        this.kafka = new Kafka({
            clientId: kafkaConfig.clientId,
            brokers: kafkaConfig.brokers,
            retry: kafkaConfig.consumer.retry,
        });

        this.consumer = this.kafka.consumer({
            groupId: kafkaConfig.groupId,
            sessionTimeout: kafkaConfig.consumer.sessionTimeout,
            heartbeatInterval: kafkaConfig.consumer.heartbeatInterval,
            allowAutoTopicCreation: kafkaConfig.consumer.allowAutoTopicCreation,
        });

        this.producer = this.kafka.producer();
    }

    public static getInstance(): KafkaClient {
        if (!KafkaClient.instance) {
            KafkaClient.instance = new KafkaClient();
        }
        return KafkaClient.instance;
    }

    public async connect(): Promise<void> {
        try {
            await this.consumer.connect();
            await this.producer.connect();
            this.isConnected = true;
            logger.info('✅ Kafka Consumer & Producer Connected');
        } catch (error) {
            logger.error('❌ Kafka Connection Failed:', error);
            throw error;
        }
    }

    public async subscribe(topics: string[]): Promise<void> {
        try {
            for (const topic of topics) {
                await this.consumer.subscribe({
                    topic,
                    fromBeginning: true // 🔥 change here
                });

                logger.info(`📥 Subscribed to topic: ${topic}`);
            }
        } catch (error) {
            logger.error('❌ Kafka Subscription Failed:', error);
            throw error;
        }
    }

    public async consume(
        messageHandler: (payload: EachMessagePayload) => Promise<void>
    ): Promise<void> {
        try {
            await this.consumer.run({
                eachMessage: async (payload: EachMessagePayload) => {
                    try {
                        await messageHandler(payload);
                    } catch (error) {
                        logger.error(`Error processing message from topic ${payload.topic}:`, error);
                        await this.sendToDLQ(payload.topic, payload.message);
                    }
                },
            });
        } catch (error) {
            logger.error('❌ Kafka Consumer Run Failed:', error);
            throw error;
        }
    }

    public async sendToDLQ(originalTopic: string, message: KafkaMessage): Promise<void> {
        try {
            await this.producer.send({
                topic: kafkaConfig.topics.dlq,
                messages: [
                    {
                        key: message.key,
                        value: message.value,
                        headers: {
                            ...message.headers,
                            'original-topic': originalTopic,
                            'error-timestamp': new Date().toISOString(),
                        },
                    },
                ],
            });
            logger.warn(`⚠️ Message sent to DLQ from topic: ${originalTopic}`);
        } catch (error) {
            logger.error('❌ Failed to send message to DLQ:', error);
        }
    }

    public async disconnect(): Promise<void> {
        if (this.isConnected) {
            await this.consumer.disconnect();
            await this.producer.disconnect();
            this.isConnected = false;
            logger.info('Kafka Disconnected');
        }
    }
}

export const kafkaClient = KafkaClient.getInstance();