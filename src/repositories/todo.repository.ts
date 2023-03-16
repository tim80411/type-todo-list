import {QueryOptions} from "mongoose";
import {TodoModel, TodoDocument} from "../models/todo.model";

export class TodoRepository {
  public async addTodo(content: string): Promise<TodoDocument> {
    const todo = await TodoModel.create({content});

    return todo;
  }

  public async getTodo(id: string): Promise<TodoDocument | null> {
    const todo = await TodoModel.findById(id);
    return todo;
  }

  public async getTodos(limit: number, skip: number): Promise<TodoDocument[]> {
    const todos = await TodoModel.find().skip(skip).limit(limit);
    return todos;
  }

  public async completedTodo(id: string, completed: boolean) {
    const options: QueryOptions = {
      new: true,
      runValidators: true
    };
    const todo = await TodoModel.findByIdAndUpdate(id, {completed}, options);
    return todo;
  }

  public async removeTodo(id: string) {
    const todo = await TodoModel.findByIdAndRemove(id);
    return todo;
  }
}