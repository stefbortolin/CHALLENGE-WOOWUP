import { Alert } from "../interface/Alert";
import { SortStrategy } from "../interface/SortStrategy";
import { InformativeAlertSortingStrategy } from "../strategies/InformativeAlertSortingStrategy";
import { UrgentAlertSortingStrategy } from "../strategies/UrgentAlertSortingStrategy";

// Clase que se encarga de ordenar las alertas, delegando la responsabilidad de ordenar cada tipo de alerta su implementación específica, y devolviendo primero las urgentes y luego las informativas.
export class AlertSorter {
    private strategy: SortStrategy = new UrgentAlertSortingStrategy();

    public setStrategy(strategy: SortStrategy): void {
        this.strategy = strategy;
    }

    public sort(alerts: Alert[]): Alert[] {
        return this.strategy.sort(alerts);
    }
  }