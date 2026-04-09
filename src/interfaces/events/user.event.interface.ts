import { BaseKafkaEvent } from '../common.interface';
import {NotificationEventType} from "../../enums/notification.event-type";

export interface SendUserOtp extends BaseKafkaEvent {
    event_type: NotificationEventType.OTP_SEND;
    data: {
        user_id: string;
        otp: number;
        email: string;
        firstName: string;
        lastName: string;
    };
}
