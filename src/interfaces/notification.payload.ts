import {NotificationEventType} from "../enums/notification.event-type";

export interface NotificationPayload{
    user_id?: string;
    channel:"EMAIL";
    event_type:NotificationEventType;
    recipient: string;
    subject?:string;
    message?:string;
    firstName?:string;
    metadata?: Record<string, any>;
}