import { Alert } from '../interface/Alert';
import { SortStrategy } from '../interface/SortStrategy';
import { UrgentAlert } from '../entities/UrgentAlert';

export class UrgentAlertSortingStrategy implements SortStrategy {
    sort(alerts: Alert[]): Alert[] {
        return alerts
            .filter(alert => alert instanceof UrgentAlert)
            .reverse();
    }
}