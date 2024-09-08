import { Alert } from "../interface/Alert";
import { Publisher } from "../interface/Publisher";
import { Subscriber } from "../interface/Subscriber";
import { AlertSorter } from "./AlertSorter";

export class Topic implements Publisher {
    private topic: string;
    private subscribers: Subscriber[] = [];
    private alerts: Alert[] = [];

    constructor(topic: string, subscribers: Subscriber[] = [], alerts: Alert[] = []) {
        this.topic = topic;
        this.subscribers = subscribers;
        this.alerts = alerts;
    }

    public subscribe(subscriber: Subscriber): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }

    public unsubscribe(subscriber: Subscriber): void {
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
    }

    public notify(alert: Alert): void {
        this.alerts.push(alert);
        this.subscribers.forEach(subscriber => {
            subscriber.notify(alert);
        });
    }

    public getNonExpiredAlerts(): { alert: Alert; target: 'topic' | 'specific' }[] {
        const alertSorter = new AlertSorter();
        const nonExpiredAlerts = this.alerts.filter(alert => !alert.isExpired());
        const sortedAlerts = alertSorter.sort(nonExpiredAlerts);
        return sortedAlerts.map(alert => ({
                alert,
                target: alert.isForTopicSuscribers() ? 'topic' : 'specific',
            }));
    }

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

    public getAlerts(): Alert[] {
        return this.alerts;
    }

    public setAlerts(alerts: Alert[]): void {
        this.alerts = alerts;
    }
}