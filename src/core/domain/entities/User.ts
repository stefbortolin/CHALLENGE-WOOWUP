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
    // Método polimorfico que notifica a un usuario de una alerta, añadiendo la alerta a su lista de no alertas no leídas.
    public notify(alert: Alert): void {
        if (!alert.isExpired()) {
            this.unreadAlerts.push(alert);
        }
    }
    // Marca una alerta como leida (la elimina de la lista de alertas no leídas y la añade a la lista de alertas leídas).
    public markAsRead(alert: Alert): void {
        this.readedAlerts.push(alert);
        this.unreadAlerts = this.unreadAlerts.filter(a => a !== alert);
    }
    // Filtra en la lista de alertas no leídas las que no han expirado y las ordena segun el tipo que sean (Urgentes y Informativas).
    public getUnreadNonExpiredAlerts(): Alert[] {
        const alertSorter = new AlertSorter();
        const nonExpiredAlerts = this.unreadAlerts.filter(alert => !alert.isExpired());
        const sortedAlerts = alertSorter.sort(nonExpiredAlerts);
        return sortedAlerts;
    }
    
    //GETTERS Y SETTERS

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