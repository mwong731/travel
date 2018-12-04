const passport = require('passport');
const bcrypt = require('./bcrypt');
// const GoogleStrategy = require('passport-google-oauth20');
// const FacebookStrategy = require('passport-facebook');
// const keys = require('./keys');
// const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
})

//facebook strategy
passport.use('facebook',
    new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['emails','photos']
    }, (accessToken, refreshToken, profile, done) => {
        console.log('using facebook...... ')
        console.log(profile);
        // User.findOne({
        //     facebookId: profile.id
        // }).then((currentUser) => {
        //     if (currentUser) {
        //         console.log('user is: ' + currentUser);
        //         done(null, currentUser);
        //     } else {
        //         new User({
        //             username: profile.displayName,
        //             facebookId: profile.id,
        //             // facebookThumbnail: profile,
        //         }).save().then((newUser)=>{
        //             console.log('new user created' + newUser);
        //             done(null, newUser);
        //         });
        //     }
        // })
    })
)

//google strategy
passport.use(
    new GoogleStrategy({
        //option for the google strat
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback funtion
        User.findOne({
            googleId: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                //already have the user
                console.log('user is: ' + currentUser);
                done(null, currentUser);
            } else {
                //if not,create user in our db 
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    googleThumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log('new user created' + newUser);
                    done(null, newUser);
                });
            }
        })
    })
);

//local login strategy
passport.use('local-login', new LocalStrategy(
    async (email, password, done) => {
        try{
            let users = await knex('users').where({email:email});
            if (users.length == 0) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
            let user = users[0];
            let result = await bcrypt.checkPassword(password, user.password);
            if(result) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect credentials'});
            }
        }catch(err){
            return done(err);
        }
    }
));

// local sign up strategy
passport.use('local-signup', new LocalStrategy(
    async (email, password, done) => {
        try{
            let users = await knex('users').where({email:email});
            if (users.length > 0) {
                return done(null, false, { message: 'Email already taken' });
            }
            let hash = await bcrypt.hashPassword(password)
            const newUser = {
                email:email,
                password: hash
            };
            let userId = await knex('users').insert(newUser).returning('id');
            console.log(userId[0])
            newUser.id = userId[0];
            console.log(newUser)
            done(null,newUser);
        }catch(err){
            done(err);
        }

    })
);