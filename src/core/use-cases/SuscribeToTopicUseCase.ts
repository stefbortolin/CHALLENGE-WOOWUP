import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { ITopicRepository } from '../repositories/interfaces/ITopicRepository';

// Use case para suscribir un usuario a un tema, se encarga de verificar que el usuario y el tema existan y en caso de que existan los suscribe.
export class SubscribeToTopicUseCase {
    private userRepository: IUserRepository;
    private topicRepository: ITopicRepository;

    constructor(userRepository: IUserRepository, topicRepository: ITopicRepository) {
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
    }

    public execute(username: string, topicName: string): void {
        const user = this.userRepository.findByUsername(username);
        const topic = this.topicRepository.findByName(topicName);

        if (!user) {
            throw new Error('User not found');
        }

        if (!topic) {
            throw new Error('Topic not found');
        }

        topic.subscribe(user);
    }
}
