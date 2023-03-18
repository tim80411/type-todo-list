import * as express from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  export interface Request {
    payload: any,
  }
}