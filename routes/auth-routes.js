const router = require('express').Router();
const passport = require('passport');

//auth local login
router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/local', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/error'
}))

router.get('/signup',(req,res)=>{
    res.render('signup')
})

// router.post('/signup',passport.authenticate('local-signup', {
//     successRedirect: '/profile',
//     failureRedirect: '/error'
// }))
router.post('/signup',(req,res)=>{
    console.log(req.body)
})
module.exports = router;