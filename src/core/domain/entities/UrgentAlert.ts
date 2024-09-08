import { Alert } from "../interface/Alert";
import { AlertMessage } from "../value-objects/AlertMessage";
import { Topic } from "./Topic";
import { User } from "./User";

export class UrgentAlert extends Alert {
    constructor(
        message: AlertMessage,
        topic: Topic | null,
        user: User | null,
        creationDate: Date,
        expirationDate: Date
    ) {
        super(message, topic, user, creationDate, expirationDate);
    }
}