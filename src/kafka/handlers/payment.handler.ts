import {NotificationService} from "../../services/notification.service";
import {PaymentFailedEvent, PaymentSuccessEvent} from "../../interfaces/events/payment.event.interface";
import {logger} from "../../utils/logger";

export class PaymentHandler{
    private notificationService: NotificationService;

    constructor(){
        this.notificationService = new NotificationService();
    }

    public async handlePaymentSuccess(event: PaymentSuccessEvent): Promise<void> {
        try {
            logger.info(`Processing payment-success event: ${event.data.payment_id}`);


            await this.notificationService.sendNotification({
                user_id:event.data.user_id,
                event_type:event.event_type,
                channel:"EMAIL",
                recipient:event.data.user_email,
                subject:"Payment Successful",
                message:`Dear ${event.data.user_name}, your payment of ${event.data.amount} ${event.data.currency} was successfully.`,
                metadata:event.data,
            });
            logger.info(`✅ Payment success notification sent for: ${event.data.payment_id}`);


        }catch(error){
            logger.error('Error handling payment-success event:', error);
            throw error;
        }
    }

    public async handlePaymentFailed(event: PaymentFailedEvent): Promise<void> {
        try {
            logger.info(`Processing payment-success event: ${event.data.payment_id}`);


            await this.notificationService.sendNotification({
                user_id:event.data.user_id,
                event_type:event.event_type,
                channel:"EMAIL",
                recipient:event.data.user_email,
                subject:"Payment Failed",
                message:`Dear ${event.data.user_name}, your payment of ${event.data.amount} was failed!`,
                metadata:event.data,
            });
            logger.info(`✅ Payment success notification sent for: ${event.data.payment_id}`);


        }catch(error){
            logger.error('Error handling payment-success event:', error);
            throw error;
        }
    }
}