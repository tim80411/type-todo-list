import express, {NextFunction, Request, Response} from 'express';
import _ from 'lodash';

import {UserModel} from '../models/user';

const router = express.Router();

function errorHandler(func: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => func(req, res, next).catch(next)
}

router.get('/test', (req, res, next) => {
  res.send('test');
})

router.post('/test', (req, res) => {
  res.send(JSON.stringify(req.body));
})

router.get('/error', (req, res) => {
  throw 'error page'
})

router.get('/errorSec', (req, res, next) => {
  next('error page second')
})

router.get('/data/error', (req, res, next) => {
  // Fake API
  const getProfile = new Promise((resolve, reject) => {
    setTimeout(() => resolve({name: 'HAO', age: 22}), 100);
  });
  const getFriends = new Promise((resolve, reject) => {
    setTimeout(() => resolve([]), 120);
  });
  const errorRequest = new Promise((resolve, reject) => {
    setTimeout(() => reject('Oops!'), 2000);
  });

  getProfile
    .then(profile => getFriends)
    .then(friends => errorRequest)
    .then(() => res.send('GoGoGo!'))
    .catch(err => next(err));
});

router.get('/data/error/promise', errorHandler(async (req, res, next) => {
  // Fake API
  const getProfile = new Promise((resolve, reject) => {
    setTimeout(() => resolve({name: 'HAO', age: 22}), 100);
  });
  const getFriends = new Promise((resolve, reject) => {
    setTimeout(() => resolve([]), 120);
  });
  const errorRequest = new Promise((resolve, reject) => {
    setTimeout(() => reject('Oops!'), 2000);
  });

  const profile = await getProfile;
  const friends = await getFriends;
  const none = await errorRequest;
  res.send('GoGoGo!');
}));

router.post('/users', errorHandler(async (req, res) => {
  const {username, email} = req.body;
  const user = await UserModel.create({username, email});

  res.send(user.toJSON());
}))

router.get('/users', errorHandler(async (req, res) => {
  const condition = _.omitBy(req.query, _.isUndefined);

  const users = await UserModel.find(condition).lean().exec();

  res.send(users);
}))

router.patch('/users/:userId', errorHandler(async (req, res) => {
  const {userId} = req.params;
  const {username} = req.body;
  const patchedUser = await UserModel.findOneAndUpdate({_id: userId}, {username}, {new: true, runValidators: true}).lean().exec();

  res.send(patchedUser);
}))

router.delete('/users/:userId', errorHandler(async (req, res) => {
  const {userId} = req.params;
  await UserModel.deleteOne({_id: userId}).exec();

  res.send('刪除成功');
}))

export default router;
