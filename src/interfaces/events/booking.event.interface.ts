import { BaseKafkaEvent } from '../common.interface';
import {NotificationEventType} from "../../enums/notification.event-type";

export interface BookingCreatedEvent extends BaseKafkaEvent {
    event_type: NotificationEventType.BOOKING_CREATED;
    data: {
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        hotel_id: string;
        hotel_name: string;
        room_id: string;
        room_number: string;
        check_in_date: string;
        check_out_date: string;
        total_price: number;
        status: string;
    };
}

export interface BookingCreatedEventSend extends BaseKafkaEvent {
    event_type: NotificationEventType.BOOKING_CREATED;
    data: {
        to: string;
        subject: string;
        channel:string;
        message: string;
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        hotel_id: string;
        hotel_name: string;
        room_id: string;
        room_number: string;
        check_in_date: string;
        check_out_date: string;
        total_price: number;
        status: string;
    };
}

export interface BookingConfirmedEvent extends BaseKafkaEvent {
    event_type: NotificationEventType.BOOKING_CONFIRMED;
    data: {
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        hotel_name: string;
        confirmation_code: string;
        check_in_date: string;
        check_out_date: string;
    };
}

export interface BookingConfirmedEventSend extends BaseKafkaEvent {
    event_type: NotificationEventType.BOOKING_CONFIRMED;
    data: {
        to: string;
        channel:string;
        message: string;
        subject: string;
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        hotel_name: string;
        confirmation_code: string;
        check_in_date: string;
        check_out_date: string;
    };
}

export interface BookingCancelledEvent extends BaseKafkaEvent {
    event_type: NotificationEventType.BOOKING_CANCELLED;
    data: {
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        hotel_name: string;
        cancellation_reason?: string;
        refund_amount?: number;
    };
}

export interface BookingCancelledEventSend extends BaseKafkaEvent {
    event_type: NotificationEventType.BOOKING_CANCELLED;
    data: {
        to: string;
        channel:string;
        message: string;
        subject: string;
        booking_id: string;
        user_id: string;
        user_email: string;
        user_name: string;
        hotel_name: string;
        cancellation_reason?: string;
        refund_amount?: number
    };
}