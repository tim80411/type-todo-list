import {App} from "./app";

const boot = () => {
  const app = new App();
  app.boot();
  app.launchDatabase()
}

boot()