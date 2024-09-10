//Se pueden registrar temas sobre los cuales se enviarán alertas.

import { Topic } from "../core/domain/entities/Topic";
import { ITopicRepository } from "../core/repositories/interfaces/ITopicRepository";
import { TopicRepository } from "../core/repositories/TopicRepository";
import { RegisterTopicUseCase } from "../core/use-cases/RegisterTopicUseCase";

describe('RegisterTopicUseCase', () => {
  let topicRepository: ITopicRepository;
  let registerTopicUseCase: RegisterTopicUseCase;

  beforeEach(() => {
    topicRepository = new TopicRepository();
    registerTopicUseCase = new RegisterTopicUseCase(topicRepository);
  });

  it('should register a new topic successfully', () => {
    const topicName = 'General';
    const newTopic = registerTopicUseCase.execute(topicName);

    expect(newTopic).toBeInstanceOf(Topic);
    expect(newTopic.getTopic()).toBe(topicName);
    expect(topicRepository.getAllTopics()).toContain(newTopic);
  });

  it('should throw an error if the topic already exists', () => {
    const topicName = 'General';
    registerTopicUseCase.execute(topicName);

    expect(() => registerTopicUseCase.execute(topicName)).toThrowError('Topic already exists');
  });
});