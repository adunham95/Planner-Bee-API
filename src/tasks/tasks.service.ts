import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class TasksService {
  constructor(@InjectQueue('tasks-queue') private readonly tasksQueue: Queue) {}

  async addTask(data: any) {
    await this.tasksQueue.add('process-task', data);
  }
}
