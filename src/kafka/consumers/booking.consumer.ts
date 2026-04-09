import {BookingHandler} from "../handlers/booking.handler";
import {logger} from "../../utils/logger";
import {EachMessagePayload} from "kafkajs";
import {
    BookingCancelledEvent,
    BookingConfirmedEvent,
    BookingCreatedEvent
} from "../../interfaces/events/booking.event.interface";


export class BookingConsumer{
    private handler: BookingHandler;

    constructor() {
        this.handler = new BookingHandler();
    }

    public async handleMessageCreateBooking(payload: EachMessagePayload){
        const {message} = payload;
        console.log("Message", message.value?.toString());

        const raw = message.value?.toString();

        if(!raw){
            logger.error('❌ Empty Kafka message');
            return;
        }

        const kafkaEvent : BookingCreatedEvent = JSON.parse(raw);

        // ✅ DEBUG: Log the ACTUAL Kafka event structure
        console.log("🔍 [UserConsumer] Raw Kafka Event:", JSON.stringify(kafkaEvent, null, 2));
        console.log("🔍 [UserConsumer] eventType value:", kafkaEvent.event_type);


        /* if(!kafkaEvent.data?.user_id || kafkaEvent.data?.email){
             logger.error('❌ Invalid USER_REGISTERED payload', kafkaEvent);
             return; // DLQ
         }*/

        const event: BookingCreatedEvent = {
            event_type: kafkaEvent.event_type || "BOOKING_CREATED",
            data: {
                booking_id: kafkaEvent.data.booking_id,
                user_id: kafkaEvent.data.user_id,
                user_email: kafkaEvent.data.user_email,
                user_name: kafkaEvent.data.user_name,
                hotel_id: kafkaEvent.data.hotel_id,
                hotel_name: kafkaEvent.data.hotel_name,
                room_id: kafkaEvent.data.room_id,
                room_number: kafkaEvent.data.room_number,
                check_in_date: kafkaEvent.data.check_in_date,
                check_out_date: kafkaEvent.data.check_out_date,
                total_price: kafkaEvent.data.total_price,
                status: kafkaEvent.data.status
            },
            event_id: "",
            timestamp: "",
            version: ""
        }

        // ✅ DEBUG: Log the mapped event
        console.log("📤 [UserConsumer] Mapped Event:", JSON.stringify(event, null, 2));

        await this.handler.handleBookingCreated(event);

    }

    public async handleMessageConfirmedBooking(payload: EachMessagePayload){
        const {message} = payload;
        console.log("Message", message.value?.toString());

        const raw = message.value?.toString();

        if(!raw){
            logger.error('❌ Empty Kafka message');
            return;
        }

        const kafkaEvent : BookingConfirmedEvent = JSON.parse(raw);

        // ✅ DEBUG: Log the ACTUAL Kafka event structure
        console.log("🔍 [UserConsumer] Raw Kafka Event:", JSON.stringify(kafkaEvent, null, 2));
        console.log("🔍 [UserConsumer] eventType value:", kafkaEvent.event_type);


        /* if(!kafkaEvent.data?.user_id || kafkaEvent.data?.email){
             logger.error('❌ Invalid USER_REGISTERED payload', kafkaEvent);
             return; // DLQ
         }*/

        const event: BookingConfirmedEvent = {
            event_type: kafkaEvent.event_type || "BOOKING_CONFIRMED",
            data: {
                booking_id: kafkaEvent.data.booking_id,
                user_id: kafkaEvent.data.user_id,
                user_email: kafkaEvent.data.user_email,
                user_name: kafkaEvent.data.user_name,
                hotel_name: kafkaEvent.data.hotel_name,
                check_in_date: kafkaEvent.data.check_in_date,
                check_out_date: kafkaEvent.data.check_out_date,
                confirmation_code: kafkaEvent.data.confirmation_code
            },
            event_id: "",
            timestamp: "",
            version: ""
        }

        // ✅ DEBUG: Log the mapped event
        console.log("📤 [UserConsumer] Mapped Event:", JSON.stringify(event, null, 2));

        await this.handler.handleBookingConfirmed(event);

    }


    public async handleMessageCancelledBooking(payload: EachMessagePayload){
        const {message} = payload;
        console.log("Message", message.value?.toString());

        const raw = message.value?.toString();

        if(!raw){
            logger.error('❌ Empty Kafka message');
            return;
        }

        const kafkaEvent : BookingCancelledEvent = JSON.parse(raw);

        // ✅ DEBUG: Log the ACTUAL Kafka event structure
        console.log("🔍 [UserConsumer] Raw Kafka Event:", JSON.stringify(kafkaEvent, null, 2));
        console.log("🔍 [UserConsumer] eventType value:", kafkaEvent.event_type);


        /* if(!kafkaEvent.data?.user_id || kafkaEvent.data?.email){
             logger.error('❌ Invalid USER_REGISTERED payload', kafkaEvent);
             return; // DLQ
         }*/

        const event: BookingCancelledEvent = {
            event_type: kafkaEvent.event_type || "BOOKING_CANCELLED",
            data: {
                booking_id: kafkaEvent.data.booking_id,
                user_id: kafkaEvent.data.user_id,
                user_email: kafkaEvent.data.user_email,
                user_name: kafkaEvent.data.user_name,
                hotel_name: kafkaEvent.data.hotel_name,
                cancellation_reason: kafkaEvent.data.cancellation_reason,
                refund_amount: kafkaEvent.data.refund_amount
            },
            event_id: "",
            timestamp: "",
            version: ""
        }

        // ✅ DEBUG: Log the mapped event
        console.log("📤 [UserConsumer] Mapped Event:", JSON.stringify(event, null, 2));

        await this.handler.handleBookingCancelled(event);

    }
}