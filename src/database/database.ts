import mongoose from 'mongoose';

const {DB_USER, DB_PWD} = process.env;

export const db = {
  connect: () => {

    const dbUrl = `mongodb+srv://${DB_USER}:${DB_PWD}@type-todo-list.uf9dpuv.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.connect(dbUrl)
      .then(() => console.log('DB is ready'))
      .catch(err => console.log(err, dbUrl));
  }
}