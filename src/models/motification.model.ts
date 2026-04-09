import mongoose, {Schema} from "mongoose";
import {Notification} from "../interfaces/notification.interface";
import {NotificationStatus} from "../enums/Notification-status.enum";

const NotificationSchema = new Schema<Notification>(
    {
    user_id: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(NotificationStatus),
        required: true,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
    retry_count: {
        type: Number,
        default: 0,
    },
    error_message: {
        type: String,
    },
    send_at: {
        type: Date,
    },
},
    {
    timestamps:{createdAt:"create_at",updatedAt:"update_at",},
}
);

export const NotificationModel = mongoose.model<Notification>('Notification', NotificationSchema);