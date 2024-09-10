import { Topic } from "../entities/Topic";
import { User } from "../entities/User";
import { AlertMessage } from "../value-objects/AlertMessage";

export abstract class Alert {
    private message: AlertMessage;
    private topic: Topic | null;
    private user: User | null;
    private creationDate: Date;
    private expirationDate: Date;
    private readedByUser: boolean = false; // En caso de que la alerta sea de un topico, digamos las alertas que fueron enviadas mediante ese topico, estaran como no leidas por defecto.

    constructor(message: AlertMessage, topic: Topic | null, user: User | null, creationDate: Date, expirationDate: Date) {
        this.message = message;
        this.topic = topic;
        this.user = user;
        this.creationDate = creationDate;
        this.expirationDate = expirationDate;
    }
    // Método para verificar si la alerta ha expirado, mediante la comparación entre la fecha actual y la de expiración.
    public isExpired(): boolean {
        return this.expirationDate < new Date();
    }
    // Método para comprobar si la alerta es para todos los suscriptores de un tema, las que sean para un usuario en especifico tendran el topic en null.
    public isForTopicSuscribers(): boolean{
        return this.topic !== null;
    }
    // Método para comprobar si la alerta es para un usuario en concreto, las que sean para todos los usuarios de un tema tendran el user en null.
    public isForSpecificUser(): boolean{
        return this.user !== null;
    }

    public markAsRead():void {
        this.readedByUser = true;
    }

    public isReade(): boolean {
        return this.readedByUser;
    }

    // GETTERS Y SETTERS
    public getMessage(): string {
        return this.message.getMessage();
    }

    public getTopic(): Topic | null {
        return this.topic;
    }

    public getUser(): User | null {
        return this.user;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }

    public getExpirationDate(): Date {
        return this.expirationDate;
    }

    public setMessage(message: AlertMessage): void {
        this.message = message;
    }

    public setTopic(topic: Topic | null): void {
        this.topic = topic;
    }

    public setUser(user: User | null): void {
        this.user = user;
    }

    public setCreationDate(creationDate: Date): void {
        this.creationDate = creationDate;
    }

    public setExpirationDate(expirationDate: Date): void {
        this.expirationDate = expirationDate;
    }

}