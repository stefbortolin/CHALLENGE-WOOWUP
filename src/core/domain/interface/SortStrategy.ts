import { Alert } from './Alert';

export interface SortStrategy {
    sort(alerts: Alert[]): Alert[];
}