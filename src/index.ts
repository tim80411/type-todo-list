import {App} from "./app";

const app = new App();

const boot = () => {
  app.boot();
  app.launchDatabase()
}

boot()