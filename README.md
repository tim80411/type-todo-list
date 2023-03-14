# TypeScript learning note

## private vs protected
- Protected: It can been accessed only by instance itself and extending class as well.
- Private: It can been accessed only by instance itself.

So the biggest different between `private` and `protected` is about if you want to use it in a extending class.

But it just constraint `property`. It will work if you use `function` to get `property`.

```ts
class Property {
  protected address: string;
  private phone: string;

  constructor() {
    this.address = 'Taipei';
    this.phone = '0900111222'
  }

  public getAddress() {
    return this.address;
  }

  public getPhone() {
    return this.phone;
  }
}

class NewTaipei extends Property {
  constructor() {
    super();
    this.address = 'NewTaipei'
  }

  public getAll() {
    return this.getAddress() + ' ' + this.getPhone();
  }

  // occur error
  public changePhone() {
    return this.phone;
  }
}


const prop = new NewTaipei();
console.log('=====', prop.getAll())
```

## base class and derived class order question
- [original document](https://codepunkt.de/writing/evaluation-order-of-field-initializers-in-javascript-and-typescript/)
- [ithome article](https://ithelp.ithome.com.tw/articles/10246118)

At the class

在class中，constructor優先於宣告於其上的property，所以若是在constructor使用在property宣告的資料就會造成error。

Validation is under below：
```ts
abstract class Base {
  constructor() {
    this.setData();
  }

  protected abstract setData(): void;
}

class Child extends Base {
  private prop = (() => {
    console.log('==prop==')
    return {key: 'value'};
  })()

  constructor() {
    super()
  }

  protected setData(): void {
    console.log('==setData==')
    // console.log('==prop inner setData==', this.prop.key);
  }
}

const child = new Child();
```

## Arrow function and this
Before using typescript class, I just have few experience to deal with `this`. So the different between below two blocks of code really shock me.

Because the code I import below had used this. So if I don't use arrow function to wrap the code. I might got error message with: "const obj = this.formatResponse(req.query, HttpStatus.OK)"

```ts
// import code
import {Request, Response, NextFunction} from 'express';
import {ControllerBase} from "../../../bases/controller.base";
import {HttpStatus} from '../../../types/response.type';

export class TodoController extends ControllerBase {
  public async getTodos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    console.log('==this==', this);
    const obj = this.formatResponse(req.query, HttpStatus.OK)

    res.status(obj.status).json(obj);
  }
}
```

```ts
import {RouteBase} from '../../../bases/route.base';
import {TodoController} from './todo.controller';

export class TodoRoute extends RouteBase {
  protected controller!: TodoController;


  constructor() {
    super();
  }

  protected initial(): void {
    this.controller = new TodoController();
    super.initial()
  }

  protected registerRoute(): void {
    //  this.router.get('/', this.controller.getTodos); 
    this.router.get('/', (req, res, next) => this.controller.getTodos(req, res, next));
  }
}
```


## Generic(泛型) for mongoose
When we talk about mongoose model type, we can use generic to handle property of Document.
There are two ways to describe what your documents look like
1. Document interface definition
2. Automatic type inference

Using Automatic type inference should aware of three point
1. You need to set strictNullChecks: true or strict: true in your tsconfig.json. Or, if you're setting flags at the command line, --strictNullChecks or --strict. There are known issues with automatic type inference with strict mode disabled.
2. You need to define your schema in the new Schema() call. Don't assign your schema definition to a temporary variable. Doing something like const schemaDefinition = { name: String }; const schema = new Schema(schemaDefinition); will not work.
3. Mongoose adds createdAt and updatedAt to your schema if you specify the timestamps option in your schema, except if you also specify methods, virtuals, or statics. There is a known issue with type inference with timestamps and methods/virtuals/statics options. If you use methods, virtuals, and statics, you're responsible for adding createdAt and updatedAt to your schema definition.


## fly.io deployment
### fly secrets
If you want to set sensitive variable, we should use `fly secrets set`.
There is a shell command for whom using `dotenv` package to handle env variable.
```sh
# the path after the cat command should be your .env file path
fly secrets set $(cat ./src/env/prod.env | xargs echo)                                
```