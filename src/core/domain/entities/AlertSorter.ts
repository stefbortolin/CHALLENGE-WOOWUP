import { Alert } from "../interface/Alert";
import { SortStrategy } from "../interface/SortStrategy";
import { InformativeAlertSortingStrategy } from "../strategies/InformativeAlertSortingStrategy";
import { UrgentAlertSortingStrategy } from "../strategies/UrgentAlertSortingStrategy";

export class AlertSorter {
    private urgentStrategy: SortStrategy = new UrgentAlertSortingStrategy();
    private informativeStrategy: SortStrategy = new InformativeAlertSortingStrategy();
  

    sort(alerts: Alert[]): Alert[] {
      const urgentAlerts = this.urgentStrategy.sort(alerts);
      const informativeAlerts = this.informativeStrategy.sort(alerts);

      return [...urgentAlerts, ...informativeAlerts];
    }
  }