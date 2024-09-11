// Se pueden obtener todas las alertas no expiradas para un tema. Se informa para cada alerta si es para todos los usuarios o para uno específico.

import { Topic } from "../core/domain/entities/Topic";
import { User } from "../core/domain/entities/User";
import { AlertFactory } from "../core/domain/factories/AlertFactory";
import AlertType from "../core/domain/interface/AlertType";
import { AlertRepository } from "../core/repositories/AlertRepository";
import { IAlertRepository } from "../core/repositories/interfaces/IAlertRepository";
import { ITopicRepository } from "../core/repositories/interfaces/ITopicRepository";
import { IUserRepository } from "../core/repositories/interfaces/IUserRepository";
import { TopicRepository } from "../core/repositories/TopicRepository";
import { UserRepository } from "../core/repositories/UserRepository";
import { RegisterTopicUseCase } from "../core/use-cases/RegisterTopicUseCase";
import { RegisterUserUseCase } from "../core/use-cases/RegisterUserUseCase";
import { SendAlertUseCase } from "../core/use-cases/SendAlertUseCase";
import { v4 as uuidv4 } from 'uuid';

describe('Topic Alerts', () => {
    let alertRepository: IAlertRepository;
    let sendAlertUseCase: SendAlertUseCase;
    let userRepository: IUserRepository;
    let topicRepository: ITopicRepository;
    let registerUserUseCase: RegisterUserUseCase;
    let registerTopicUseCase: RegisterTopicUseCase;
    let topic: Topic;
    let user1: User;
    let user2: User;
    let alertFactory: AlertFactory;

    beforeEach(() => {
        userRepository = new UserRepository();
        topicRepository = new TopicRepository();
        registerUserUseCase = new RegisterUserUseCase(userRepository);
        registerTopicUseCase = new RegisterTopicUseCase(topicRepository);
        alertRepository = new AlertRepository();
        sendAlertUseCase = new SendAlertUseCase(alertRepository);
        alertFactory = new AlertFactory();

        topic = registerTopicUseCase.execute('General');
        user1 = registerUserUseCase.execute('User1');
        user2 = registerUserUseCase.execute('User2');

        topic.subscribe(user1);
        topic.subscribe(user2);

        const now = new Date();
        const expirationDate = new Date(now.getTime() + 1000000);

        sendAlertUseCase.execute(uuidv4(), AlertType.INFORMATIVE, 'Info 1', null, topic, now, expirationDate);
        sendAlertUseCase.execute(uuidv4(), AlertType.URGENT, 'Urgent 1', null, topic, now, expirationDate);
        sendAlertUseCase.execute(uuidv4(), AlertType.INFORMATIVE, 'Info 2', null, topic, now, expirationDate);
        sendAlertUseCase.execute(uuidv4(), AlertType.URGENT, 'Urgent 2', null, topic, now, expirationDate);
        sendAlertUseCase.execute(uuidv4(), AlertType.INFORMATIVE, 'Info 3', null, topic, now, expirationDate);
    });

    test('should retrieve all non-expired alerts for a topic, sorted correctly', () => {
        const nonExpiredAlerts = topic.getNonExpiredAlerts();

        expect(nonExpiredAlerts.length).toBe(5);
        expect(nonExpiredAlerts[0].alert.getMessage()).toBe('Urgent 2');
        expect(nonExpiredAlerts[1].alert.getMessage()).toBe('Urgent 1');
        expect(nonExpiredAlerts[2].alert.getMessage()).toBe('Info 1');
        expect(nonExpiredAlerts[3].alert.getMessage()).toBe('Info 2');
        expect(nonExpiredAlerts[4].alert.getMessage()).toBe('Info 3');
    });
});