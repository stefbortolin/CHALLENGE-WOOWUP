import { Alert } from "../interface/Alert";
import { InformativeAlertSortingStrategy } from "../strategies/InformativeAlertSortingStrategy";
import { UrgentAlertSortingStrategy } from "../strategies/UrgentAlertSortingStrategy";
import { AlertSorter } from "./AlertSorter";
import { InformativeAlert } from "./InformativeAlert";
import { UrgentAlert } from "./UrgentAlert";


export class AlertManager {
    private alerts: Alert[] = [];
    private alertSorter: AlertSorter;

    constructor(alertSorter: AlertSorter) {
        this.alertSorter = alertSorter;
    }

    addAlert(alert: Alert): void {
        if (!alert.isExpired()) {
            this.alerts.push(alert);
        }
    }

    markAlertAsRead(alert: Alert): void {
        this.alerts.find(a => a === alert)?.markAsRead();
    }

    getUnreadNonExpiredAlerts(): Alert[] {
        const unreadAlerts = this.alerts.filter(alert => !alert.isReade());
        const urgentAlerts = unreadAlerts.filter(alert => alert instanceof UrgentAlert && !alert.isExpired());
        const informativeAlerts = unreadAlerts.filter(alert => alert instanceof InformativeAlert && !alert.isExpired());
        
        this.alertSorter.setStrategy(new UrgentAlertSortingStrategy()); 
        const sortedUrgentAlerts = this.alertSorter.sort(urgentAlerts);
        
        this.alertSorter.setStrategy(new InformativeAlertSortingStrategy()); 
        const sortedInformativeAlerts = this.alertSorter.sort(informativeAlerts);
        
        return [...sortedUrgentAlerts, ...sortedInformativeAlerts];
    }

}
