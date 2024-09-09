
import { Topic } from '../domain/entities/Topic';
import { TopicRepository } from '../repositories/TopicRepository';

// Use case para registrar un tema, se encarga de verificar que no exista un tema con el mismo nombre y en caso de que no exista lo crea utilizando el repository.
export class RegisterTopicUseCase {
  private topicRepository: TopicRepository;

  constructor(topicRepository: TopicRepository) {
    this.topicRepository = topicRepository;
  }

  execute(name: string): Topic {
    const existingTopic = this.topicRepository.findByName(name);

    if (existingTopic) {
      throw new Error('Topic already exists');
    }

    const newTopic = new Topic(name);
    this.topicRepository.save(newTopic);
    return newTopic;
  }
}
