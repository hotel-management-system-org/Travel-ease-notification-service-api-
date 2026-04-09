import {NotificationService} from "../../services/notification.service";
import {
    BookingCancelledEvent,
    BookingConfirmedEvent,
    BookingCreatedEvent
} from "../../interfaces/events/booking.event.interface";
import {logger} from "../../utils/logger";

export class BookingHandler{
    private notificationService:NotificationService

    constructor(){
        this.notificationService = new NotificationService();
    }

    public async handleBookingCreated(event: BookingCreatedEvent){
        try {
            logger.info(`Processing booking-created event: ${event.data.booking_id}`);

            await this.notificationService.sendNotification({
                channel: "EMAIL",
                recipient: event.data.user_email,
                user_id:event.data.user_id,
                event_type:event.event_type,
                subject:'Booking Created Successfully',
                message:`Dear ${event.data.user_name}, your booking at ${event.data.hotel_name} has been created.`,
                metadata:event.data

            });
            logger.info(`✅ Booking created notification sent for: ${event.data.booking_id}`);
        }catch(error){
            logger.error('Error handling booking-created event:', error);
            throw error;
        }
    }

    public async handleBookingConfirmed(event: BookingConfirmedEvent): Promise<void> {
        try {
            logger.info(`Processing booking-confirmed event: ${event.data.booking_id}`);

            await this.notificationService.sendNotification({
                channel: "EMAIL",
                recipient: event.data.user_email,
                user_id:event.data.user_id,
                event_type:event.event_type,
                subject:'Booking Confirmed',
                message: `Dear ${event.data.user_name}, your booking has been confirmed! Confirmation code: ${event.data.confirmation_code}`,
                metadata:event.data
            });

            logger.info(`✅ Booking confirmed notification sent for: ${event.data.booking_id}`);
        } catch (error) {
            logger.error('Error handling booking-confirmed event:', error);
            throw error;
        }
    }

    public async handleBookingCancelled(event: BookingCancelledEvent): Promise<void> {
        try {
            logger.info(`Processing booking-cancelled event: ${event.data.booking_id}`);

            await this.notificationService.sendNotification({
                channel: "EMAIL",
                recipient: event.data.user_email,
                user_id:event.data.user_id,
                event_type:event.event_type,
                subject: 'Booking Cancelled',
                message: `Dear ${event.data.user_name}, your booking has been cancelled.`,
                metadata:event.data
            });

            logger.info(`✅ Booking cancelled notification sent for: ${event.data.booking_id}`);
        } catch (error) {
            logger.error('Error handling booking-cancelled event:', error);
            throw error;
        }
    }
}