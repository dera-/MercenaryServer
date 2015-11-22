import UserDao from '../infrastructure/db/dao/UserDao';

export default class TwitterAuthService {
  constructor(){
    this.userDao = new UserDao();
  }

  getUserData(session) {
    if (session.user === null) {
      return Promise.resolve({});
    }
    return this.userDao.findByTwitterId(session.user.id);
  }

  registerUserData(session) {
    return this.userDao.findByTwitterId(session.user.id)
      .then((data) => {
        if (Object.keys(data).length === 0) {
          return this.userDao.insert(session.user);
        }
        return Promise.resolve(false);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
