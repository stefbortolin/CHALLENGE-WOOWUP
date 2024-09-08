import { Alert } from "../domain/interface/Alert";


export class AlertRepository {
    private alerts: Alert[] = [];

    save(alert: Alert): void {
        this.alerts.push(alert);
    }

    findNonExpiredAlerts(): Alert[] {
        return this.alerts.filter(alert => !alert.isExpired());
    }

    getAlerts(): Alert[] {
        return this.alerts;
    }

    getAlertsForUser(username: string): Alert[] {
        return this.alerts.filter(alert => alert.getUser()?.getUsername() === username);
    }

    getAlertsForTopic(topic: string): Alert[] {
        return this.alerts.filter(alert => alert.getTopic()?.getTopic() === topic);
    }
}