import {BaseKafkaEvent} from "../common.interface";
import {NotificationEventType} from "../../enums/notification.event-type";

export interface PaymentSuccessEvent extends BaseKafkaEvent{
    event_type: NotificationEventType.PAYMENT_SUCCESS;
    data: {
        payment_id: string;
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        amount: number;
        currency: string;
        payment_method: string;
        transaction_id: string;
    }
}

export interface PaymentSuccessEventSend extends BaseKafkaEvent{
    event_type: NotificationEventType.PAYMENT_SUCCESS;
    data: {
        to:string;
        subject:string;
        channel:string;
        message:string;
        payment_id: string;
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        amount: number;
        currency: string;
        payment_method: string;
        transaction_id: string;
    }
}


export interface PaymentFailedEvent extends BaseKafkaEvent {
    event_type: NotificationEventType.PAYMENT_FAILED;
    data: {
        payment_id: string;
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        amount: number;
        failure_reason: string;
    };
}

export interface PaymentFailedEventSend extends BaseKafkaEvent {
    event_type: NotificationEventType.PAYMENT_FAILED;
    data: {
        to:string;
        subject:string;
        channel:string;
        message:string;
        payment_id: string;
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        amount: number;
        failure_reason: string;
    };
}