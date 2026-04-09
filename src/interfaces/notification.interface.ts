import {Document} from 'mongoose';
import {NotificationStatus} from "../enums/Notification-status.enum";

export interface Notification extends Document {
    user_id: string;
    channel:'EMAIL';
    status:NotificationStatus;
    subject:string;
    message:string;
    retry_count:number;
    error_message:string;
    send_at?:Date;
    create_at?:Date;
    update_at?:Date;
}