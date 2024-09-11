// Los usuarios pueden optar sobre cuales temas quieren recibir alertas.

import { UserRepository } from '../core/repositories/UserRepository';
import { TopicRepository } from '../core/repositories/TopicRepository';
import { User } from '../core/domain/entities/User';
import { Topic } from '../core/domain/entities/Topic';
import { SubscribeToTopicUseCase } from '../core/use-cases/SuscribeToTopicUseCase';
import { AlertMessage } from '../core/domain/value-objects/AlertMessage';
import { UrgentAlert } from '../core/domain/entities/UrgentAlert';
import { InformativeAlert } from '../core/domain/entities/InformativeAlert';
import { RegisterUserUseCase } from '../core/use-cases/RegisterUserUseCase';
import { RegisterTopicUseCase } from '../core/use-cases/RegisterTopicUseCase';
import { IUserRepository } from '../core/repositories/interfaces/IUserRepository';
import { ITopicRepository } from '../core/repositories/interfaces/ITopicRepository';
import { v4 as uuidv4 } from 'uuid';

describe('SubscribeToTopicUseCase', () => {
  let user: User;
  let topic: Topic;
  let userRepository: IUserRepository;
  let topicRepository: ITopicRepository;
  let registerUserUseCase: RegisterUserUseCase;
  let registerTopicUseCase: RegisterTopicUseCase;
  let subscribeToTopicUseCase: SubscribeToTopicUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    topicRepository = new TopicRepository();
    registerUserUseCase = new RegisterUserUseCase(userRepository);
    registerTopicUseCase = new RegisterTopicUseCase(topicRepository);
    subscribeToTopicUseCase = new SubscribeToTopicUseCase(
      userRepository, 
      topicRepository
    );
    registerUserUseCase.execute('user');
    registerTopicUseCase.execute('topic');
    user = userRepository.findByUsername('user')!;
    topic = topicRepository.findByName('topic')!;
  });

  it('should allow a user to subscribe to a topic', () => {
    topic.subscribe(user);

    expect(topic.getSubscribers()).toContain(user);
  });

  it('should allow a user to receive an alert from a topic', () => {
    const alertMessage = AlertMessage.create('New urgent alert');
    const alert = new UrgentAlert(uuidv4(),alertMessage, topic, null, new Date(), new Date(new Date().getTime() + 100000));
    topic.subscribe(user);
    topic.notify(alert);

    expect(user.getUnreadNonExpiredAlerts()).toContain(alert);
  });

  it('should allow a user to unsubscribe from a topic', () => {
    topic.subscribe(user);
    topic.unsubscribe(user);

    const alertMessage = AlertMessage.create('New invormative alert');
    const alert = new InformativeAlert(uuidv4(), alertMessage, topic, null, new Date(), new Date(new Date().getTime() + 100000));
    topic.notify(alert);

    expect(user.getUnreadNonExpiredAlerts()).not.toContain(alert);
  });

  it('should throw an error if the user is not found when subscribing', () => {
    const nonExistentUser = new User('non_existent_user');
    
    expect(() => subscribeToTopicUseCase.execute(nonExistentUser.getUsername(), topic.getTopic())).toThrow('User not found');
  });

  it('should throw an error if the topic is not found when subscribing', () => {
    const nonExistentTopic = new Topic('non_existent_topic');

    expect(() => subscribeToTopicUseCase.execute(user.getUsername(), nonExistentTopic.getTopic())).toThrow('Topic not found');
  });
});
