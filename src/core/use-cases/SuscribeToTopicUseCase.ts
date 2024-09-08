import { UserRepository } from '../repositories/UserRepository';
import { TopicRepository } from '../repositories/TopicRepository';

export class SubscribeToTopicUseCase {
    private userRepository: UserRepository;
    private topicRepository: TopicRepository;

    constructor(userRepository: UserRepository, topicRepository: TopicRepository) {
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
