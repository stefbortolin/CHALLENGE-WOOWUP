import { Alert } from "../../domain/interface/Alert";

export interface IAlertRepository {
    save(alert: Alert): void;
    findNonExpiredAlerts(): Alert[];
    getAlerts(topicName: string): Alert[];
    getAlertById(alertId: string): Alert | undefined;
    getAlertsForUser(username: string): Alert[];
    getAlertsForTopic(topic: string): Alert[];
    markAsRead(alert: Alert): void;
}
