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
            logger.error('Empty Kafka message');
            return;
        }

        try {


            const kafkaEvent: SendUserOtp = JSON.parse(raw);

            if (!kafkaEvent.data || !kafkaEvent.data.email) {
                logger.error('[UserConsumer] Invalid payload structure from Spring Boot');
                return;
            }


            const event: SendUserOtp = {
                event_type: kafkaEvent.event_type || "OTP_SEND",
                data: {
                    user_id: kafkaEvent.data.user_id,
                    email: kafkaEvent.data.email,
                    first_name: kafkaEvent.data.first_name,
                    last_name: kafkaEvent.data.last_name,
                    otp: kafkaEvent.data.otp
                },
                event_id: "",
                timestamp: "",
                version: ""
            }

            console.log("[UserConsumer] Mapped Event:", JSON.stringify(event, null, 2));

            await this.handler.handleUserOtpSend(event);

        }catch(error) {
            logger.error('[UserConsumer] Error parsing Spring Boot Kafka message:', error);
        }
    }


}