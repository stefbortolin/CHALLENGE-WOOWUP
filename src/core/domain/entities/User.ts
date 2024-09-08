import { Alert } from "../interface/Alert";
import { Subscriber } from "../interface/Subscriber";
import { AlertSorter } from "./AlertSorter";

export class User implements Subscriber{
    private username: string;
    private readedAlerts: Alert[] = [];
    private unreadAlerts: Alert[] = [];

    constructor(username: string) {
        this.username = username;
    }

    public notify(alert: Alert): void {
        if (!alert.isExpired()) {
            this.unreadAlerts.push(alert);
        }
    }

    public markAsRead(alert: Alert): void {
        this.readedAlerts.push(alert);
        this.unreadAlerts = this.unreadAlerts.filter(a => a !== alert);
    }

    public getUnreadNonExpiredAlerts(): Alert[] {
        const alertSorter = new AlertSorter();
        const nonExpiredAlerts = this.unreadAlerts.filter(alert => !alert.isExpired());
        const sortedAlerts = alertSorter.sort(nonExpiredAlerts);
        return sortedAlerts;
    }
    
    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getReadedAlerts(): Alert[] {
        return this.readedAlerts;
    }

    public setReadedAlerts(readedAlerts: Alert[]): void {
        this.readedAlerts = readedAlerts;
    }

    public getUnreadAlerts(): Alert[] {
        return this.unreadAlerts;
    }

    public setUnreadAlerts(unreadAlerts: Alert[]): void {
        this.unreadAlerts = unreadAlerts;
    }
}