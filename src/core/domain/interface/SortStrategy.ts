import { Alert } from './Alert';

// Interfaz que contiene la definicion del metodo polimorfico de ordenamiento de alertas (Patron Strategy).
export interface SortStrategy {
    sort(alerts: Alert[]): Alert[];
}