export interface BaseKafkaEvent{
    event_id: string,
    event_type: string,
    timestamp: string,
    version: string,
}