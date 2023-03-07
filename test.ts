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