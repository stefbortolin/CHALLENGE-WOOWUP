import { Topic } from "../../domain/entities/Topic";

export interface ITopicRepository {
    
  save(topic: Topic): void;

  findByName(name: string): Topic | undefined;

  getAllTopics(): Topic[];
}