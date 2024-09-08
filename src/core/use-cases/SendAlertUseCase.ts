import { Topic } from "../domain/entities/Topic";
import { User } from "../domain/entities/User";
import { AlertFactory } from "../domain/factories/AlertFactory";
import AlertType from "../domain/interface/AlertType";
import { AlertRepository } from "../repositories/AlertRepository";

export class SendAlertUseCase {
    private alertRepository: AlertRepository;

    constructor(alertRepository: AlertRepository) {
        this.alertRepository = alertRepository;
    }
    execute(
        type: AlertType,
        message: string,
        user: User | null,
        topic: Topic | null,
        creationDate: Date,
        expirationDate: Date
    ): void {
        const alert = AlertFactory.createAlert(
            type,
            message,
            user,
            topic,
            creationDate,
            expirationDate
        );

        this.alertRepository.save(alert);

        if (user) {
            user.notify(alert);
        } else if (topic) {
            topic.notify(alert);
        } else {
            throw new Error('Invalid alert input');
        }
    }
}