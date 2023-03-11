import mongoose from 'mongoose';
import {DATABASE_OPTIONS} from './database.option';

export class Database {
  public connect(): void {
    const {DB_USER, DB_PWD, DB_NAME} = process.env;
    const dbUrl = `mongodb+srv://${DB_USER}:${DB_PWD}@type-todo-list.uf9dpuv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
    mongoose.connect(dbUrl, DATABASE_OPTIONS)
      .then(() => console.log(`Database ${DB_NAME} is connected`))
      .catch(err => console.error(err))
  }
}