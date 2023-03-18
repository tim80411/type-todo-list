import {QueryOptions} from "mongoose";
import {TodoModel, TodoDocument} from "../models/todo.model";

export class TodoRepository {
  public async addTodo(userId: string, content: string): Promise<TodoDocument> {
    const todo = await TodoModel.create({content, owner: userId});

    return todo;
  }

  public async getTodo(userId: string, id: string): Promise<TodoDocument | null> {
    const todo = await TodoModel.findOne({_id: id, owner: userId}).exec();
    return todo;
  }

  public async getTodos(userId: string, limit: number, skip: number): Promise<TodoDocument[]> {
    const todos = await TodoModel.find({owner: userId}).skip(skip).limit(limit).exec();
    return todos;
  }

  public async completedTodo(userId: string, id: string, completed: boolean) {
    const options: QueryOptions = {
      new: true,
      runValidators: true
    };
    const todo = await TodoModel.findOneAndUpdate({_id: id, owner: userId}, {completed}, options);
    return todo;
  }

  public async removeTodo(userId: string, id: string) {
    const todo = await TodoModel.findOneAndRemove({_id: id, owner: userId});
    return todo;
  }
}