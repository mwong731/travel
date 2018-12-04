const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }

    router.get('/secret',  isLoggedIn, (req, res) => {
        res.send('Here you go, a secret');
    });

    //auth login 
    router.get('/login', (req, res) => {
        res.render('login');
    });

    //auth logout
    router.get('/logout', (req, res) => {
        //handle with passport
        // res.send('logging out');
        req.logOut();
        res.redirect('/');
    })
    

    router.post('/login/local', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/error'
    }));

  
    router.get('/login/signup', (req, res) => {
        res.render('signup');
    });
    
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/error'
    }));
    
    router.get('/error', (req, res) => {
        res.send('You are not logged in!');
    });

    return router;
};
