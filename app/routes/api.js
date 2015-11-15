let express = require('express'),
  router = express.Router(),
  TwitterAuthService = require('../service/TwitterAuthService'),
  twitterAuthService = new TwitterAuthService();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {title: 'Express', session:req.session.passport});
});

router.get('/user/get', (req, res, next) => {
  twitterAuthService.getUserData(req.session.passport)
    .then((data)=>{res.send(data);})
    .catch((error)=>{
      console.error(error.stack);
      next(error);
    });
});

router.get('/user/register', (req, res, next) => {
  twitterAuthService.registerUserData(req.session.passport)
    .then((data)=>{res.send(data);})
    .catch((error)=>{
      console.error(error.stack);
      next(error);
    });
});

module.exports = router;
