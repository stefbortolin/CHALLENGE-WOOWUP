import { Alert } from '../interface/Alert';
import { SortStrategy } from '../interface/SortStrategy';
import { InformativeAlert } from '../entities/InformativeAlert';

// Clase que implementa la interfaz SortStrategy, se encarga de ordenar las alertas urgentes con metodo FIFO.
export class InformativeAlertSortingStrategy implements SortStrategy {
    sort(alerts: Alert[]): Alert[] {
        return alerts
            .filter(alert => alert instanceof InformativeAlert);
    }
}