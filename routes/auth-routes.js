const router = require('express').Router();
const passport = require('passport');
//Login page
router.get('/login',(req,res)=>{
    res.render('login')
})

//auth logout
router.get('/logout',(req,res)=>{
    //handle with passport
    // res.send('logging out');
    req.logOut();
    res.redirect('/');
})

//Signup page
router.get('/signup',(req,res)=>{
    res.render('signup')
})

//Callback route for local login
router.post('/local', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/error'
}))

//Callback route for local signup
router.post('/signup',passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/error'
}))

//Auth with google 
router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}));

//Callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    // res.send(req.user);
    res.redirect('/profile');
});


//Auth with facebook
router.get('/facebook',passport.authenticate('facebook',{
    scope:['email','user_photos'] 
}));

//Callback route for facebook to redirect to 
router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
    // res.send(req.user);
    res.redirect('/profile');
});


module.exports = router;