let AuthConfig = require('../../config/auth'),
  passport = require('passport'),
  express = require('express'),
  TwitterStrategy = require('passport-twitter').Strategy,
  router = express.Router();

passport.use(
  new TwitterStrategy(
    {
      consumerKey: AuthConfig.twitter.consumer_key,
      consumerSecret: AuthConfig.twitter.consumer_secret,
      callbackURL: AuthConfig.twitter.callback_url //Twitterログイン後、遷移するURL
    },
    function (token, tokenSecret, profile, done) {
      passport.session.accessToken = token;
      process.nextTick(
        function () {
          done(null, profile);
        }
      );
    }
  )
);

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

// 認証のために Twitter へリダイレクトさせます。認証が完了すると、Twitter は
// ユーザーをアプリケーションへとリダイレクトして戻します。
//   /auth/twitter/callback
router.get('/', passport.authenticate('twitter'));

// ユーザーが許可すると、Twitter はユーザーをこの URL にリダイレクトさせます。
// この認証プロセスの最後に、アクセストークンの取得をおこないます。
// この取得が成功すればユーザーはログインしたことになります。取得に失敗したとき
// は、認証が失敗したとみなされます。
router.get('/callback',
  passport.authenticate('twitter', { successRedirect: '/v1.0',
                                     failureRedirect: '/error' }));

export default router;