import {NotificationEventType} from "../enums/notification.event-type";

export interface EmailOtpPayload {
    to: string;
    subject: string;
    event_type:NotificationEventType;
    recipient: string;
    channel:string;
    otp: number;
    firstName: string;
    message:string;
    metadata?: Record<string, any>;
}