import nodemailer, {Transporter} from "nodemailer";
import {EmailOtpPayload} from "../../interfaces/email-payload.channel";
import {EmailConfig} from "../../config/email.config";
import {TemplateService} from "../template.service";
import {NotificationEventType} from "../../enums/notification.event-type";
import {
    BookingCancelledEventSend,
    BookingConfirmedEventSend,
    BookingCreatedEventSend
} from "../../interfaces/events/booking.event.interface";
import {PaymentFailedEventSend, PaymentSuccessEventSend} from "../../interfaces/events/payment.event.interface";

export class EmailService {
    private transporter: Transporter;
    private templateService: TemplateService;

    constructor() {
        this.transporter = nodemailer.createTransport(EmailConfig.smtp);
        this.templateService = new TemplateService();

    }


    public async sendOtp(payload: EmailOtpPayload): Promise<void> {
       let template = await this.templateService.applyTemplate(NotificationEventType.OTP_SEND);

        template = template.replace(/\${firstName}/g, payload.firstName || '')
            .replace(/\${otp}/g, String(payload.otp))
            .replace(/\${year}/g, new Date().getFullYear().toString());

        try {
            await this.transporter.sendMail({
                from: `${EmailConfig.from.name} <${EmailConfig.from.email}>`,
                to: payload.to,
                subject: payload.subject,
                html: template,
            });


        }catch(err) {
            console.log(err);
            throw err;
        }
    }

    public async sendBookingCreateNotification(payload:BookingCreatedEventSend): Promise<void> {

        let template = await this.templateService.applyTemplate(NotificationEventType.BOOKING_CREATED);

        template = template.replace(/\${firstName}/g, payload.data.user_name || '')
            .replace(/\${booking_id}/g, payload.data.booking_id)
            .replace(/\${hotel_name}/g, payload.data.hotel_name)
            .replace(/\${room_number}/g, payload.data.room_number)
            .replace(/\${check_in_date}/g, payload.data.check_in_date)
            .replace(/\${check_out_date}/g, payload.data.check_out_date)
            .replace(/\${total_price}/g, payload.data.total_price.toString())
            .replace(/\${status}/g, payload.data.status)
            .replace(/\${year}/g, new Date().getFullYear().toString());

        try {
            await this.transporter.sendMail({
                from: `${EmailConfig.from.name} <${EmailConfig.from.email}>`,
                to: payload.data.to,
                subject: payload.data.subject,
                html: template,
            });


        }catch(err) {
            console.log(err);
            throw err;
        }
    }

    public async sendBookingConfirmNotification(payload:BookingConfirmedEventSend): Promise<void> {

        let template = await this.templateService.applyTemplate(NotificationEventType.BOOKING_CONFIRMED);

        template = template.replace(/\${user_name}/g, payload.data.user_name || '')
            .replace(/\${booking_id}/g, payload.data.booking_id)
            .replace(/\${hotel_name}/g, payload.data.hotel_name)
            .replace(/\${confirmation_code}/g, payload.data.confirmation_code)
            .replace(/\${check_in_date}/g, payload.data.check_in_date)
            .replace(/\${check_out_date}/g, payload.data.check_out_date)
            .replace(/\${year}/g, new Date().getFullYear().toString());

        try {
            await this.transporter.sendMail({
                from: `${EmailConfig.from.name} <${EmailConfig.from.email}>`,
                to: payload.data.to,
                subject: payload.data.subject,
                html: template,
            });


        }catch(err) {
            console.log(err);
            throw err;
        }
    }

    public async sendBookingCancelledNotification(payload:BookingCancelledEventSend): Promise<void> {

        let template = await this.templateService.applyTemplate(NotificationEventType.BOOKING_CANCELLED);

        if (payload.data.cancellation_reason != null) {
            template = template.replace(/\${user_name}/g, payload.data.user_name || '')
                .replace(/\${booking_id}/g, payload.data.booking_id)
                .replace(/\${hotel_name}/g, payload.data.hotel_name)
                .replace(/\${cancellation_reason}/g, payload.data.cancellation_reason)
                .replace(/\${refund_amount}/g, (payload.data.refund_amount ?? 0).toString())
                .replace(/\${year}/g, new Date().getFullYear().toString());
        }

        try {
            await this.transporter.sendMail({
                from: `${EmailConfig.from.name} <${EmailConfig.from.email}>`,
                to: payload.data.to,
                subject: payload.data.subject,
                html: template,
            });


        }catch(err) {
            console.log(err);
            throw err;
        }
    }

    public async sendPaymentSuccessNotification(payload:PaymentSuccessEventSend): Promise<void> {

        let template = await this.templateService.applyTemplate(NotificationEventType.PAYMENT_SUCCESS);


            template = template.replace(/\${payment_id}/g, payload.data.payment_id || '')
                .replace(/\${booking_id}/g, payload.data.booking_id)
                .replace(/\${transaction_id}/g, payload.data.transaction_id)
                .replace(/\${currency}/g, payload.data.currency)
                .replace(/\${payment_method}/g, payload.data.payment_method)
                .replace(/\${amount}/g, (payload.data.amount ?? 0).toString())
                .replace(/\${year}/g, new Date().getFullYear().toString());


        try {
            await this.transporter.sendMail({
                from: `${EmailConfig.from.name} <${EmailConfig.from.email}>`,
                to: payload.data.to,
                subject: payload.data.subject,
                html: template,
            });


        }catch(err) {
            console.log(err);
            throw err;
        }
    }

    public async sendPaymentFailedNotification(payload:PaymentFailedEventSend): Promise<void> {

        let template = await this.templateService.applyTemplate(NotificationEventType.PAYMENT_SUCCESS);


        template = template.replace(/\${user_name}/g, payload.data.user_name || '')
            .replace(/\${payment_id}/g, payload.data.payment_id)
            .replace(/\${booking_id}/g, payload.data.booking_id)
            .replace(/\${amount}/g, String(payload.data.amount))
            .replace(/\${failure_reason}/g, payload.data.failure_reason)
            .replace(/\${year}/g, new Date().getFullYear().toString());


        try {
            await this.transporter.sendMail({
                from: `${EmailConfig.from.name} <${EmailConfig.from.email}>`,
                to: payload.data.to,
                subject: payload.data.subject,
                html: template,
            });


        }catch(err) {
            console.log(err);
            throw err;
        }
    }





}