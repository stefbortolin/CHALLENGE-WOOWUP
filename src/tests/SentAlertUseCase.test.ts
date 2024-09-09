import { Topic } from "../core/domain/entities/Topic";
import { User } from "../core/domain/entities/User";
import { AlertFactory } from "../core/domain/factories/AlertFactory";
import AlertType from "../core/domain/interface/AlertType";
import { AlertRepository } from "../core/repositories/AlertRepository";
import { SendAlertUseCase } from "../core/use-cases/SendAlertUseCase";

//Se puede enviar una alerta sobre un tema y lo reciben todos los usuarios que han optado recibir alertas de ese tema.
//Se puede enviar una alerta sobre un tema a un usuario específico, solo lo recibe ese único usuario

describe('SendAlertUseCase', () => {
    let alertRepository: AlertRepository;
    let sendAlertUseCase: SendAlertUseCase;
    let topic: Topic;
    let user1: User;
    let user2: User;
    let alertFactory: AlertFactory;

    beforeEach(() => {
        alertRepository = new AlertRepository();
        sendAlertUseCase = new SendAlertUseCase(alertRepository);
        alertFactory = new AlertFactory();

        topic = new Topic('General');
        user1 = new User('User1');
        user2 = new User('User2');

        topic.subscribe(user1);
        topic.subscribe(user2);
    });

    test('should send an alert to all subscribers of the topic', () => {
        const creationDate = new Date();
        const expirationDate = new Date(creationDate.getTime() + 1000000); 

        sendAlertUseCase.execute(
            AlertType.URGENT,
            'Urgent alert message',
            null, 
            topic,
            creationDate,
            expirationDate
        );

        const nonExpiredAlertsForUser1 = user1.getUnreadNonExpiredAlerts();
        const nonExpiredAlertsForUser2 = user2.getUnreadNonExpiredAlerts();

        expect(nonExpiredAlertsForUser1.length).toBe(1);
        expect(nonExpiredAlertsForUser2.length).toBe(1);

        expect(nonExpiredAlertsForUser1[0].getMessage()).toBe('Urgent alert message');
        expect(nonExpiredAlertsForUser2[0].getMessage()).toBe('Urgent alert message');
    });
});
