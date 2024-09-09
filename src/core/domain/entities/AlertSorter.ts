import { Alert } from "../interface/Alert";
import { SortStrategy } from "../interface/SortStrategy";
import { InformativeAlertSortingStrategy } from "../strategies/InformativeAlertSortingStrategy";
import { UrgentAlertSortingStrategy } from "../strategies/UrgentAlertSortingStrategy";

// Clase que se encarga de ordenar las alertas, delegando la responsabilidad de ordenar cada tipo de alerta su implementación específica, y devolviendo primero las urgentes y luego las informativas.
export class AlertSorter {
    private urgentStrategy: SortStrategy = new UrgentAlertSortingStrategy();
    private informativeStrategy: SortStrategy = new InformativeAlertSortingStrategy();
  

    sort(alerts: Alert[]): Alert[] {
      const urgentAlerts = this.urgentStrategy.sort(alerts);
      const informativeAlerts = this.informativeStrategy.sort(alerts);

      return [...urgentAlerts, ...informativeAlerts];
    }
  }