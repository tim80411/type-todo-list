import {QueryOptions} from "mongoose";

import {TodoModel} from "../../../models/todo.model";

import {TodoDTO} from "../../../dtos/todo.dto";
import {DefaultQuery} from "../../../types/request.type";
import {TodoRepository} from "../../../repositories/todo.repository";

export class TodoService {
  private readonly TodoRepo = new TodoRepository();

  public async getTodos(limit: number = DefaultQuery.LIMIT, skip: number = DefaultQuery.SKIP): Promise<TodoDTO[]> {
    const truthLimit = Math.min(Number(limit), DefaultQuery.MAX_LIMIT) || DefaultQuery.LIMIT;
    const truthSkip = Number(skip) || DefaultQuery.SKIP;

    const todos = await this.TodoRepo.getTodos(truthLimit, truthSkip);

    const dtos = todos.map(todo => new TodoDTO(todo));

    return dtos;
  }

  public async getTodo(id: string): Promise<TodoDTO | null> {
    const todo = await this.TodoRepo.getTodo(id);
    const dto = todo ? new TodoDTO(todo) : null;
    return dto;
  }

  public async addTodo(content: string): Promise<TodoDTO> {
    // TODO: refactor by using same source: db maybe
    const todo = await this.TodoRepo.addTodo(content);
    const dto = new TodoDTO(todo);

    return dto;
  }

  public async completedTodo(id: string, completed: boolean): Promise<TodoDTO | null> {
    const todo = await this.TodoRepo.completedTodo(id, completed);

    const dto = todo ? new TodoDTO(todo) : null;
    return dto;
  }

  public async removeTodo(id: string): Promise<TodoDTO | null> {
    const todo = await this.TodoRepo.removeTodo(id);
    const dto = todo ? new TodoDTO(todo) : null;
    return dto;
  }
}