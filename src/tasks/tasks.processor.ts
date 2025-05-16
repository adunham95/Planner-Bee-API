import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('tasks-queue')
export class TasksProcessor {
  @Process('process-task')
  async handleTask(job: Job) {
    console.log('Processing task:', job.data);
    // Write the job logic here
  }
}
