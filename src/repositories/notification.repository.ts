import {Notification} from "../interfaces/notification.interface";
import {NotificationModel} from "../models/motification.model";

export class NotificationRepository {

    public async create(date: Partial<Notification>): Promise<Notification> {
        const notification = new NotificationModel(date);
        return await notification.save();
    }

}