import { Alert } from '../interface/Alert';
import { SortStrategy } from '../interface/SortStrategy';
import { UrgentAlert } from '../entities/UrgentAlert';

// Clase que implementa la interfaz SortStrategy, se encarga de ordenar las alertas urgentes con metodo LIFO.
export class UrgentAlertSortingStrategy implements SortStrategy {
    sort(alerts: Alert[]): Alert[] {
        return alerts
            .filter(alert => alert instanceof UrgentAlert)
            .reverse();
    }
}