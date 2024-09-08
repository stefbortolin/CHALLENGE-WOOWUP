import { Alert } from '../interface/Alert';
import { SortStrategy } from '../interface/SortStrategy';
import { InformativeAlert } from '../entities/InformativeAlert';

export class InformativeAlertSortingStrategy implements SortStrategy {
    sort(alerts: Alert[]): Alert[] {
        return alerts
            .filter(alert => alert instanceof InformativeAlert);
    }
}