import {NotificationService} from "../../services/notification.service";
import {SendUserOtp} from "../../interfaces/events/user.event.interface";
import {logger} from "../../utils/logger";
import {
    BookingCancelledEvent, BookingCancelledEventSend,
    BookingConfirmedEvent, BookingConfirmedEventSend,
    BookingCreatedEvent,
    BookingCreatedEventSend
} from "../../interfaces/events/booking.event.interface";

export class UserHandler{
    private notificationService:NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }

    public async handleUserOtpSend(event:SendUserOtp):Promise<void>{

        console.log("User send otp event", event.event_type);
        logger.info(
            `Processing USER_OTP  | email=${event.data.email}`
        );

        const payload = {
            to: event.data.email,
            firstName: event.data.firstName,
            event_type:event.event_type,
            recipient:event.data.email,
            channel:'EMAIL',
            otp: event.data.otp,
            subject: 'Welcome! Please Verify Your Email',
            message: `Dear ${event.data.firstName}, Welcome to Travel Ease`,
            metadata: event.data,
        }

        console.log(
            "Payload BEFORE sendNotification:",
            JSON.stringify(payload, null, 2)
        );

        await this.notificationService.sendOtpNotification(payload)

    }

    public async handleCreateBooking(event:BookingCreatedEvent):Promise<void>{

        console.log("User send otp event", event.event_type);
        logger.info(
            `Processing Create event  | email=${event.data.user_email}`
        );

        const payload = <BookingCreatedEventSend><unknown>{
            to: event.data.user_email,
            channel: 'EMAIL',
            booking_id: event.data.booking_id,
            hotel_id: event.data.hotel_id,
            user_id: event.data.user_id,
            user_email: event.data.user_email,
            user_name: event.data.user_name,
            hotel_name: event.data.hotel_name,
            room_number: event.data.room_number,
            room_id: event.data.room_id,
            chick_in_date: event.data.check_in_date,
            check_out_date: event.data.check_out_date,
            event_type: event.event_type,
            total_price: event.data.total_price,
            status: event.data.status,
            subject: 'Welcome! Booking is created successfully!',
            message: `Dear ${event.data.user_name}, Welcome to Travel Ease`,
            metadata: event.data,
        }

        console.log(
            "Payload BEFORE sendNotification:",
            JSON.stringify(payload, null, 2)
        );

        await this.notificationService.handleBookingCreated(payload)

    }

    public async handleConfirmBooking(event:BookingConfirmedEvent):Promise<void>{

        console.log("User send otp event", event.event_type);
        logger.info(
            `Processing Create event  | email=${event.data.user_email}`
        );

        const payload = <BookingConfirmedEventSend><unknown>{
            to: event.data.user_email,
            channel: 'EMAIL',
            booking_id: event.data.booking_id,
            user_id: event.data.user_id,
            user_email: event.data.user_email,
            user_name: event.data.user_name,
            hotel_name: event.data.hotel_name,
            chick_in_date: event.data.check_in_date,
            confirmation_date: event.data.check_out_date,
            check_out_date: event.data.check_out_date,
            event_type: event.event_type,
            subject: 'Welcome! Booking is confirmed successfully!',
            message: `Dear ${event.data.user_name}, Welcome to Travel Ease`,
            metadata: event.data,
        }

        console.log(
            "Payload BEFORE sendNotification:",
            JSON.stringify(payload, null, 2)
        );

        await this.notificationService.handleBookingConfirm(payload)

    }


    public async handleCancelledBooking(event:BookingCancelledEvent):Promise<void>{

        console.log("User send otp event", event.event_type);
        logger.info(
            `Processing Create event  | email=${event.data.user_email}`
        );

        const payload = <BookingCancelledEventSend><unknown>{
            to: event.data.user_email,
            channel: 'EMAIL',
            booking_id: event.data.booking_id,
            user_id: event.data.user_id,
            user_email: event.data.user_email,
            user_name: event.data.user_name,
            hotel_name: event.data.hotel_name,
            event_type: event.event_type,
            cancellation_reason: event.data.cancellation_reason,
            subject: 'Welcome! Booking is cancelled successfully!',
            message: `Dear ${event.data.user_name}, Welcome to Travel Ease`,
            metadata: event.data,
        }

        console.log(
            "Payload BEFORE sendNotification:",
            JSON.stringify(payload, null, 2)
        );

        await this.notificationService.handleBookingCancelled(payload)

    }

}