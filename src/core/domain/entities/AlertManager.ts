import { Alert } from "../interface/Alert";
import { InformativeAlertSortingStrategy } from "../strategies/InformativeAlertSortingStrategy";
import { UrgentAlertSortingStrategy } from "../strategies/UrgentAlertSortingStrategy";
import { AlertSorter } from "./AlertSorter";
import { InformativeAlert } from "./InformativeAlert";
import { UrgentAlert } from "./UrgentAlert";


export class AlertManager {
    private readedAlerts: Alert[] = [];
    private unreadAlerts: Alert[] = [];
    private alertSorter: AlertSorter;

    constructor(alertSorter: AlertSorter) {
        this.alertSorter = alertSorter;
    }

    addAlert(alert: Alert): void {
        if (!alert.isExpired()) {
            this.unreadAlerts.push(alert);
        }
    }

    markAlertAsRead(alert: Alert): void {
        this.readedAlerts.push(alert);
        this.unreadAlerts = this.unreadAlerts.filter(a => a !== alert);
    }

    getUnreadNonExpiredAlerts(): Alert[] {
        const urgentAlerts = this.unreadAlerts.filter(alert => alert instanceof UrgentAlert && !alert.isExpired());
        const informativeAlerts = this.unreadAlerts.filter(alert => alert instanceof InformativeAlert && !alert.isExpired());
        
        this.alertSorter.setStrategy(new UrgentAlertSortingStrategy()); 
        const sortedUrgentAlerts = this.alertSorter.sort(urgentAlerts);
        
        this.alertSorter.setStrategy(new InformativeAlertSortingStrategy()); 
        const sortedInformativeAlerts = this.alertSorter.sort(informativeAlerts);
        
        return [...sortedUrgentAlerts, ...sortedInformativeAlerts];
    }

}
