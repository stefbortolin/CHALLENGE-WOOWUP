import { Topic } from '../domain/entities/Topic';

export class TopicRepository {
  private topics: Topic[] = [];

  public save(topic: Topic): void {
    this.topics.push(topic);
  }

  public findByName(name: string): Topic | undefined {
    return this.topics.find(topic => topic.getTopic() === name);
  }

  public getAllTopics(): Topic[] {
    return this.topics;
  }
}