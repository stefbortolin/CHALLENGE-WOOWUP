import { Topic } from "../entities/Topic";
import { User } from "../entities/User";
import { AlertMessage } from "../value-objects/AlertMessage";

export abstract class Alert {
    private message: AlertMessage;
    private topic: Topic | null;
    private user: User | null;
    private creationDate: Date;
    private expirationDate: Date;

    constructor(message: AlertMessage, topic: Topic | null, user: User | null, creationDate: Date, expirationDate: Date) {
        this.message = message;
        this.topic = topic;
        this.user = user;
        this.creationDate = creationDate;
        this.expirationDate = expirationDate;
    }

    public isExpired(): boolean {
        return this.expirationDate < new Date();
    }

    public isForTopicSuscribers(): boolean{
        return this.topic !== null;
    }

    public isForSpecificUser(): boolean{
        return this.user !== null;
    }
    // Getters
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

    // Setters
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