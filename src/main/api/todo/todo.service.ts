import {ResponseTodoDTO} from "../../../dtos/todo.dto";
import {JWTPayloadDTO} from "../../../dtos/jwt-payload.dto";
import {DefaultQuery} from "../../../types/request.type";
import {TodoRepository} from "../../../repositories/todo.repository";

export class TodoService {
  private readonly TodoRepo = new TodoRepository();

  public async getTodos(payload: JWTPayloadDTO, limit: number = DefaultQuery.LIMIT, skip: number = DefaultQuery.SKIP): Promise<ResponseTodoDTO[]> {
    console.log('==test==')
    const truthLimit = Math.min(Number(limit), DefaultQuery.MAX_LIMIT) || DefaultQuery.LIMIT;
    const truthSkip = Number(skip) || DefaultQuery.SKIP;

    const todos = await this.TodoRepo.getTodos(payload._id, truthLimit, truthSkip);

    const dtos = todos.map(todo => new ResponseTodoDTO(todo));

    return dtos;
  }

  public async getTodo(payload: JWTPayloadDTO, id: string): Promise<ResponseTodoDTO | null> {
    const todo = await this.TodoRepo.getTodo(payload._id, id);
    const dto = todo ? new ResponseTodoDTO(todo) : null;
    return dto;
  }

  public async addTodo(payload: JWTPayloadDTO, content: string): Promise<ResponseTodoDTO> {
    // TODO: refactor by using same source: db maybe
    const todo = await this.TodoRepo.addTodo(payload._id, content);
    const dto = new ResponseTodoDTO(todo);

    return dto;
  }

  public async completedTodo(payload: JWTPayloadDTO, id: string, completed: boolean): Promise<ResponseTodoDTO | null> {
    const todo = await this.TodoRepo.completedTodo(payload._id, id, completed);

    const dto = todo ? new ResponseTodoDTO(todo) : null;
    return dto;
  }

  public async removeTodo(payload: JWTPayloadDTO, id: string): Promise<ResponseTodoDTO | null> {
    const todo = await this.TodoRepo.removeTodo(payload._id, id);
    const dto = todo ? new ResponseTodoDTO(todo) : null;
    return dto;
  }
}