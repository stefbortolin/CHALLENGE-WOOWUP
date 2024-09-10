import { Alert } from "../interface/Alert";
import { Publisher } from "../interface/Publisher";
import { Subscriber } from "../interface/Subscriber";
import { AlertManager } from "./AlertManager";
import { AlertSorter } from "./AlertSorter";

export class Topic implements Publisher {
    private topic: string;
    private subscribers: Subscriber[] = [];
    private alertManager: AlertManager = new AlertManager(new AlertSorter());

    constructor(topic: string, subscribers: Subscriber[] = [], alerts: Alert[] = []) {
        this.topic = topic;
        this.subscribers = subscribers;
    }
    // Método polimorfico que suscribe a un nuevo usuario al tema.
    public subscribe(subscriber: Subscriber): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }
    // Método polimorfico que desuscribe a un usuario del tema.
    public unsubscribe(subscriber: Subscriber): void {
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
    }
    // Método polimorfico que notifica a todos los suscriptores de una alerta, añadiendo la alerta a la lista de alertas del tema y enviandole a cada suscriptor la alerta.
    public notify(alert: Alert): void {
        this.alertManager.addAlert(alert);
        this.subscribers.forEach(subscriber => {
            subscriber.notify(alert);
        });
    }
    // Método que filtra en la lista de alertas las que no han expirado y las ordena segun el tipo que sean (Urgentes e Informativas). Ademas, devuelve si la alerta es para todos los suscriptores del tema o para un usuario en concreto.
    public getNonExpiredAlerts(): { alert: Alert; target: 'topic' | 'specific' }[] {
        const alertSorter = new AlertSorter();
        const nonExpiredAlerts = this.alertManager.getUnreadNonExpiredAlerts();
        return nonExpiredAlerts.map(alert => ({
                alert,
                target: alert.isForTopicSuscribers() ? 'topic' : 'specific',
            }));
    }

    // GETTERS Y SETTERS
    public getTopic(): string {
        return this.topic;
    }

    public setTopic(topic: string): void {
        this.topic = topic;
    }

    public getSubscribers(): Subscriber[] {
        return this.subscribers;
    }

    public setSubscribers(subscribers: Subscriber[]): void {
        this.subscribers = subscribers;
    }
}