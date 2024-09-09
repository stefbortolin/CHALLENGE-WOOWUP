import { Topic } from '../domain/entities/Topic';

// Repositorio para los temas, al igual que los demas repositorios trabajan en memoria directo, es ideal para luego implementar una conexion a base de datos y no afectar el resto del codigo.
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