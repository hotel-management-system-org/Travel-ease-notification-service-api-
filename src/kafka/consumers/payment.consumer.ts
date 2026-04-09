import {PaymentHandler} from "../handlers/payment.handler";
import {EachMessagePayload} from "kafkajs";
import {logger} from "../../utils/logger";
import {PaymentFailedEvent, PaymentSuccessEvent} from "../../interfaces/events/payment.event.interface";

export class PaymentConsumer{
    private handler:PaymentHandler;

   constructor() {
       this.handler = new PaymentHandler();
   }

   public async handelMessageSuccessPayment(payload: EachMessagePayload): Promise<void> {
       const {message} = payload;
       console.log("Message", message.value?.toString());

       const raw = message.value?.toString();

       if(!raw){
           logger.error('❌ Empty Kafka message');
           return;
       }

       const kafkaEvent : PaymentSuccessEvent = JSON.parse(raw);

       // ✅ DEBUG: Log the ACTUAL Kafka event structure
       console.log("🔍 [UserConsumer] Raw Kafka Event:", JSON.stringify(kafkaEvent, null, 2));
       console.log("🔍 [UserConsumer] eventType value:", kafkaEvent.event_type);

       const event:PaymentSuccessEvent = {
           event_type:kafkaEvent.event_type || "PAYMENT_SUCCESS",
           data:{
               payment_id:kafkaEvent.data.payment_id,
               booking_id:kafkaEvent.data.booking_id,
               user_id:kafkaEvent.data.user_id,
               user_email:kafkaEvent.data.user_email,
               user_name:kafkaEvent.data.user_name,
               amount:kafkaEvent.data.amount,
               currency:kafkaEvent.data.currency,
               payment_method:kafkaEvent.data.payment_method,
               transaction_id:kafkaEvent.data.transaction_id
           },
           event_id: "",
           timestamp: "",
           version: ""
       }
       console.log("📤 [UserConsumer] Mapped Event:", JSON.stringify(event, null, 2));

       await this.handler.handlePaymentSuccess(event);


   }

    public async handelMessageFailedPayment(payload: EachMessagePayload): Promise<void> {
        const {message} = payload;
        console.log("Message", message.value?.toString());

        const raw = message.value?.toString();

        if(!raw){
            logger.error('❌ Empty Kafka message');
            return;
        }

        const kafkaEvent : PaymentFailedEvent = JSON.parse(raw);

        // ✅ DEBUG: Log the ACTUAL Kafka event structure
        console.log("🔍 [UserConsumer] Raw Kafka Event:", JSON.stringify(kafkaEvent, null, 2));
        console.log("🔍 [UserConsumer] eventType value:", kafkaEvent.event_type);

        const event:PaymentFailedEvent = {
            event_type:kafkaEvent.event_type || "PAYMENT_FAILED",
            data:{
                payment_id:kafkaEvent.data.payment_id,
                booking_id:kafkaEvent.data.booking_id,
                user_id:kafkaEvent.data.user_id,
                user_email:kafkaEvent.data.user_email,
                user_name:kafkaEvent.data.user_name,
                amount:kafkaEvent.data.amount,
                failure_reason:kafkaEvent.data.failure_reason
            },
            event_id: "",
            timestamp: "",
            version: ""
        }
        console.log("📤 [UserConsumer] Mapped Event:", JSON.stringify(event, null, 2));

        await this.handler.handlePaymentFailed(event);


    }
}