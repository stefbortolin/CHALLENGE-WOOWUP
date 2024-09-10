import { Alert } from "../../domain/interface/Alert";

export interface IAlertRepository {
    save(alert: Alert): void;
    findNonExpiredAlerts(): Alert[];
    getAlerts(topicName: string): Alert[];
    getAlertsForUser(username: string): Alert[];
    getAlertsForTopic(topic: string): Alert[];
}
