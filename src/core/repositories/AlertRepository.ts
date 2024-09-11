import { Alert } from "../domain/interface/Alert";
import { IAlertRepository } from "./interfaces/IAlertRepository";

// Repositorio para las alertas, al igual que los demas repositorios trabajan en memoria directo,
// es ideal para luego implementar una conexion a base de datos y no afectar el resto del codigo y partes del sistema.
export class AlertRepository implements IAlertRepository {
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

    getAlertById(alertId: string): Alert | undefined {
        return this.alerts.find(a => a.getId() === alertId);
    }

    getAlertsForUser(username: string): Alert[] {
        return this.alerts.filter(alert => alert.getUser()?.getUsername() === username);
    }

    getAlertsForTopic(topic: string): Alert[] {
        return this.alerts.filter(alert => alert.getTopic()?.getTopic() === topic);
    }

    markAsRead(alert: Alert): void {
        this.alerts.find(a => a === alert)?.markAsRead();
    }
}