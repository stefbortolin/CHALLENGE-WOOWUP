import { Alert } from "../interface/Alert";
import { Subscriber } from "../interface/Subscriber";
import { AlertManager } from "./AlertManager";
import { AlertSorter } from "./AlertSorter";

export class User implements Subscriber{
    private username: string;
    private alertManager: AlertManager = new AlertManager(new AlertSorter());

    constructor(username: string) {
        this.username = username;
    }
    // Método polimorfico que notifica a un usuario de una alerta, añadiendo la alerta a su lista de no alertas no leídas.
    public notify(alert: Alert): void {
        this.alertManager.addAlert(alert);
    }
    // Marca una alerta como leida (la elimina de la lista de alertas no leídas y la añade a la lista de alertas leídas).
    public markAsRead(alert: Alert): void {
        this.alertManager.markAlertAsRead(alert);
    }
    // Filtra en la lista de alertas no leídas las que no han expirado y las ordena segun el tipo que sean (Urgentes y Informativas).
    public getUnreadNonExpiredAlerts(): Alert[] {
        return this.alertManager.getUnreadNonExpiredAlerts();
    }
    
    //GETTERS Y SETTERS

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

}