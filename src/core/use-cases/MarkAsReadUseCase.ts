import { AlertManager } from "../domain/entities/AlertManager";
import { Alert } from "../domain/interface/Alert";
import { IAlertRepository } from "../repositories/interfaces/IAlertRepository";

export class MarkAlertAsReadUseCase {
    private alertManager: AlertManager;
    private alertRepository: IAlertRepository;

    constructor(alertManager: AlertManager, alertRepository: IAlertRepository) {
        this.alertManager = alertManager;
        this.alertRepository = alertRepository;
    }

    public execute(alertId: string): void {
        const existingAlert = this.alertRepository.getAlertById(alertId);
        if (!existingAlert) {
            throw new Error('Alert not found');
        }
        
        this.alertRepository.markAsRead(existingAlert);
        this.alertManager.markAlertAsRead(existingAlert);
    }
}