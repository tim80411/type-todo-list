import {QueryOptions} from "mongoose";

import {TodoModel} from "../../../models/todo.model";

import {TodoDTO} from "../../../dtos/todo.dto";
import {DefaultQuery} from "../../../types/request.type";

export class TodoService {
  public async getTodos(limit: number = DefaultQuery.LIMIT, skip: number = DefaultQuery.SKIP): Promise<TodoDTO[]> {
    const truthLimit = Math.min(Number(limit), DefaultQuery.MAX_LIMIT) || DefaultQuery.LIMIT;
    const truthSkip = Number(skip) || DefaultQuery.SKIP;

    const todos = await TodoModel.find().skip(truthSkip).limit(truthLimit).exec();
    const dtos = todos.map(todo => new TodoDTO(todo));

    return dtos;
  }

  public async getTodo(id: string): Promise<TodoDTO | null> {
    const todo = await TodoModel.findById(id);
    const dto = todo ? new TodoDTO(todo) : null;
    return dto;
  }

  public async addTodo(content: string): Promise<TodoDTO> {
    // TODO: refactor by using same source: db maybe
    const todo = await TodoModel.create({content, completed: false});
    const dto = new TodoDTO(todo);

    return dto;
  }

  public async completedTodo(id: string, completed: boolean): Promise<TodoDTO | null> {
    const options: QueryOptions = {
      new: true,
      runValidators: true
    };
    const todo = await TodoModel.findByIdAndUpdate(id, {completed}, options);

    const dto = todo ? new TodoDTO(todo) : null;
    return dto;
  }

  public async removeTodo(id: string): Promise<TodoDTO | null> {
    const todo = await TodoModel.findByIdAndRemove(id);
    const dto = todo ? new TodoDTO(todo) : null;
    return dto;
  }
}