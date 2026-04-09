import {EmailService} from "./channels/email.service";
import {EmailOtpPayload} from "../interfaces/email-payload.channel";
import {NotificationPayload} from "../interfaces/notification.payload";
import {NotificationStatus} from "../enums/Notification-status.enum";
import {NotificationRepository} from "../repositories/notification.repository";
import {
    BookingCancelledEventSend,
    BookingConfirmedEventSend,
    BookingCreatedEventSend
} from "../interfaces/events/booking.event.interface";
import {PaymentFailedEventSend, PaymentSuccessEventSend} from "../interfaces/events/payment.event.interface";

export class NotificationService {

    private emailService: EmailService;
    private notificationRepo: NotificationRepository;

    constructor() {
        this.emailService = new EmailService();
        this.notificationRepo = new NotificationRepository();
    }



    public async sendOtpNotification(emailPayload: EmailOtpPayload): Promise<void> {
        console.log("📥 [sendNotification] Payload RECEIVED:", JSON.stringify(emailPayload, null, 2));

        await this.emailService.sendOtp(emailPayload);
    }

    public async handleBookingCreated(emailPayload: BookingCreatedEventSend): Promise<void> {
        console.log("📥 [sendNotification] Payload RECEIVED:", JSON.stringify(emailPayload, null, 2));

        const notification = <NotificationPayload><unknown>{
            user_id: emailPayload.data.user_id,
            channel: emailPayload.data.channel,
            event_type: emailPayload.event_type,
            subject: emailPayload.data.subject,
            message: emailPayload.data.message,
            status: emailPayload.data.status,
        }

        await this.sendNotification(notification);
        await this.emailService.sendBookingCreateNotification(emailPayload);
    }

    public async handleBookingConfirm(emailPayload: BookingConfirmedEventSend): Promise<void> {
        console.log("📥 [sendNotification] Payload RECEIVED:", JSON.stringify(emailPayload, null, 2));

        const notification = <NotificationPayload><unknown>{
            user_id: emailPayload.data.user_id,
            channel: emailPayload.data.channel,
            event_type: emailPayload.event_type,
            subject: emailPayload.data.subject,
            message: emailPayload.data.message,
        }

        await this.sendNotification(notification);

        await this.emailService.sendBookingConfirmNotification(emailPayload);
    }

    public async handleBookingCancelled(emailPayload: BookingCancelledEventSend): Promise<void> {
        console.log("📥 [sendNotification] Payload RECEIVED:", JSON.stringify(emailPayload, null, 2));

        const notification = <NotificationPayload><unknown>{
            user_id: emailPayload.data.user_id,
            channel: emailPayload.data.channel,
            event_type: emailPayload.event_type,
            subject: emailPayload.data.subject,
            message: emailPayload.data.message,
        }

        await this.sendNotification(notification);

        await this.emailService.sendBookingCancelledNotification(emailPayload);
    }

    public async handlePaymentSuccess(emailPayload: PaymentSuccessEventSend): Promise<void> {
        console.log("📥 [sendNotification] Payload RECEIVED:", JSON.stringify(emailPayload, null, 2));

        const notification = <NotificationPayload><unknown>{
            user_id: emailPayload.data.user_id,
            channel: emailPayload.data.channel,
            event_type: emailPayload.event_type,
            subject: emailPayload.data.subject,
            message: emailPayload.data.message,
        }

        await this.sendNotification(notification);

        await this.emailService.sendPaymentSuccessNotification(emailPayload);
    }

    public async handlePaymentFailed(emailPayload: PaymentFailedEventSend): Promise<void> {
        console.log("📥 [sendNotification] Payload RECEIVED:", JSON.stringify(emailPayload, null, 2));

        const notification = <NotificationPayload><unknown>{
            user_id: emailPayload.data.user_id,
            channel: emailPayload.data.channel,
            event_type: emailPayload.event_type,
            subject: emailPayload.data.subject,
            message: emailPayload.data.message,
        }

        await this.sendNotification(notification);

        await this.emailService.sendPaymentFailedNotification(emailPayload);
    }

    public async sendNotification(notificationPayload: NotificationPayload): Promise<void> {

        const repoData = {
          user_id : notificationPayload.user_id,
          channel : notificationPayload.channel,
          event_type : notificationPayload.event_type,
          subject:notificationPayload.subject,
          message : notificationPayload.message,
          status:NotificationStatus.PENDING,
          retry_count: 0,
        }


        const notification = await this.notificationRepo.create(repoData);

        console.log("✅ [sendNotification] Notification created with ID:", notification._id);


    }

}