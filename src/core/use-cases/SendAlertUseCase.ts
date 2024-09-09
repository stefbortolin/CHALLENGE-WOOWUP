import { Topic } from "../domain/entities/Topic";
import { User } from "../domain/entities/User";
import { AlertFactory } from "../domain/factories/AlertFactory";
import AlertType from "../domain/interface/AlertType";
import { AlertRepository } from "../repositories/AlertRepository";

// Use case para enviar una alerta, se encarga de crear la alerta utilizando el factory, guardandola con el repository y notificar al usuario o tema correspondiente mediante los metodos notify del patron Observer.
export class SendAlertUseCase {
    private alertRepository: AlertRepository;

    constructor(alertRepository: AlertRepository) {
        this.alertRepository = alertRepository;
    }
    execute(
        type: AlertType,
        message: string,
        user: User | null, // Para alertas enviadas a usuarios concretos se recibe un user como parametro, y el tema se envia en null.
        topic: Topic | null, // Para alertas enviadas a todos los suscriptores de un tema se recibe un topic como parametro, y el user se envia en null.
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
        // Validar que no se envíen ambos, user y topic, al mismo tiempo.
        if (user && topic) {
            throw new Error('Invalid alert input: both user and topic cannot be provided simultaneously.');
        }
        // Validar que se envíe al menos uno, user o topic.
        if (!user && !topic) {
            throw new Error('Invalid alert input: either user or topic must be provided.');
        }

        this.alertRepository.save(alert);

        // Si es una alerta para un usuario, notificar al usuario.
        if (user) {
            user.notify(alert);
        } else if (topic) { // Si es una alerta para un tema, notificar a todos los suscriptores del tema.
            topic.notify(alert);
        }
    }
}