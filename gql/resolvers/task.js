import { GraphQLList } from 'graphql';
import { TaskType } from '../types';
import { Task } from '../../database/model';

const TasksResolver = {
  type: new GraphQLList(TaskType),
  args: {},
  async resolve(parentValue, args) {
    return Task.find({}, function (err, tasks) {
      if (err) return console.error(err);
      return tasks
    })
  }
}

export default TasksResolver