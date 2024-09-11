//Se pueden obtener todas las alertas no expiradas de un usuario que aún no ha leído. 

import { Topic } from "../core/domain/entities/Topic";
import { User } from "../core/domain/entities/User";
import { AlertFactory } from "../core/domain/factories/AlertFactory";
import AlertType from "../core/domain/interface/AlertType";
import { AlertRepository } from "../core/repositories/AlertRepository";
import { IAlertRepository } from "../core/repositories/interfaces/IAlertRepository";
import { IUserRepository } from "../core/repositories/interfaces/IUserRepository";
import { UserRepository } from "../core/repositories/UserRepository";
import { RegisterUserUseCase } from "../core/use-cases/RegisterUserUseCase";
import { SendAlertUseCase } from "../core/use-cases/SendAlertUseCase";
import { v4 as uuidv4 } from 'uuid';

describe('User Alerts', () => {
    let alertRepository: IAlertRepository;
    let sendAlertUseCase: SendAlertUseCase;
    let userRepository: IUserRepository;
    let registerUserUseCase: RegisterUserUseCase;
    let user1: User;
    let user2: User;
    let alertFactory: AlertFactory;

    beforeEach(() => {
        alertRepository = new AlertRepository();
        sendAlertUseCase = new SendAlertUseCase(alertRepository);
        userRepository = new UserRepository();
        registerUserUseCase = new RegisterUserUseCase(userRepository);
        alertFactory = new AlertFactory();

        user1 = registerUserUseCase.execute('User1');
        user2 = registerUserUseCase.execute('User2');

        const now = new Date();
        const expirationDate = new Date(now.getTime() + 1000000);

        sendAlertUseCase.execute(uuidv4(), AlertType.INFORMATIVE, 'Info 1', user1, null, now, expirationDate);
        sendAlertUseCase.execute(uuidv4(), AlertType.URGENT, 'Urgent 1', user1, null, now, expirationDate);
        sendAlertUseCase.execute(uuidv4(), AlertType.INFORMATIVE, 'Info 2', user1, null, now, expirationDate);
        sendAlertUseCase.execute(uuidv4(), AlertType.URGENT, 'Urgent 2', user1, null, now, expirationDate);
        sendAlertUseCase.execute(uuidv4(), AlertType.INFORMATIVE, 'Info 3', user1, null, now, expirationDate);
    });

    test('should retrieve all unread non-expired alerts for a user, sorted correctly', () => {
        const nonExpiredAlerts = user1.getUnreadNonExpiredAlerts();

        expect(nonExpiredAlerts.length).toBe(5);
        expect(nonExpiredAlerts[0].getMessage()).toBe('Urgent 2');
        expect(nonExpiredAlerts[1].getMessage()).toBe('Urgent 1');
        expect(nonExpiredAlerts[2].getMessage()).toBe('Info 1');
        expect(nonExpiredAlerts[3].getMessage()).toBe('Info 2');
        expect(nonExpiredAlerts[4].getMessage()).toBe('Info 3');
    });
});