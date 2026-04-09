import {NotificationEventType} from "../enums/notification.event-type";
import fs from 'fs';
import path from "node:path";


export class TemplateService{

    public async applyTemplate(event_type: NotificationEventType): Promise<string> {
        try {
            let templateFile = "";

            switch (event_type) {
                case "OTP_SEND":
                    templateFile = "otp.html";
                    break;

                case "USER_CREATE":
                    templateFile = "user-created.html";
                    break;

                case "PAYMENT_SUCCESS":
                    templateFile = "payment-success.html";
                    break;
                case "PAYMENT_FAILED":
                    templateFile = "payment-failed.html";
                    break;

                case "BOOKING_CREATED":
                    templateFile = "booking-created.html";
                    break;
                case "BOOKING_CONFIRMED":
                    templateFile = "booking-confirmed.html";
                    break;
                case "BOOKING_CANCELLED":
                    templateFile = "booking-cancelled.html";
                    break;

                default:
                    throw new Error("Invalid notification event type");
            }

            console.log("Template file ",templateFile);

            const templatePath = path.join(__dirname, 'templates', templateFile);
            return fs.readFileSync(templatePath, 'utf8');

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}