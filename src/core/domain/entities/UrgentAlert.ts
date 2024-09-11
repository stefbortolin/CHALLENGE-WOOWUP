import { Alert } from "../interface/Alert";
import { AlertMessage } from "../value-objects/AlertMessage";
import { Topic } from "./Topic";
import { User } from "./User";

// Clase que representa una alerta urgente, que extiende de la clase abstracta Alert.
export class UrgentAlert extends Alert {
    constructor(
        id: string,
        message: AlertMessage,
        topic: Topic | null,
        user: User | null,
        creationDate: Date,
        expirationDate: Date
    ) {
        super(id, message, topic, user, creationDate, expirationDate);
    }
}