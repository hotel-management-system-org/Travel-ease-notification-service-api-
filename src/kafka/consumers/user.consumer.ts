import {UserHandler} from "../handlers/user.handler";
import {EachMessagePayload} from "kafkajs";
import {logger} from "../../utils/logger";
import {SendUserOtp} from "../../interfaces/events/user.event.interface";

export class UserConsumer{
    private handler:UserHandler;

    constructor(){
        this.handler = new UserHandler();
    }

    public async handleMessage(payload: EachMessagePayload){
        const {message} = payload;
        console.log("Message", message.value?.toString());

        const raw = message.value?.toString();

        if(!raw){
            logger.error('❌ Empty Kafka message');
            return;
        }

        const kafkaEvent : SendUserOtp = JSON.parse(raw);

        // ✅ DEBUG: Log the ACTUAL Kafka event structure
        console.log("🔍 [UserConsumer] Raw Kafka Event:", JSON.stringify(kafkaEvent, null, 2));
        console.log("🔍 [UserConsumer] eventType value:", kafkaEvent.event_type);


       /* if(!kafkaEvent.data?.user_id || kafkaEvent.data?.email){
            logger.error('❌ Invalid USER_REGISTERED payload', kafkaEvent);
            return; // DLQ
        }*/

        const event: SendUserOtp = {
            event_type: kafkaEvent.event_type || "OTP_SEND",
            data: {
                user_id: kafkaEvent.data.user_id,
                email: kafkaEvent.data.email,
                firstName: kafkaEvent.data.firstName,
                lastName: kafkaEvent.data.lastName,
                otp: kafkaEvent.data.otp
            },
            event_id: "",
            timestamp: "",
            version: ""
        }

        // ✅ DEBUG: Log the mapped event
        console.log("📤 [UserConsumer] Mapped Event:", JSON.stringify(event, null, 2));

        await this.handler.handleUserOtpSend(event);

    }


}