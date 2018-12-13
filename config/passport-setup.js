const passport = require('passport');
const bcrypt = require('./bcrypt');

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');

//Set up knex
require('dotenv').config();
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
});

//Serializing and deserializing
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let users = await knex('users').where({ id: id });
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
});

//Local login strate
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) => {
        try {
            let users = await knex('users').where({ email: email });
            if (users.length == 0) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
            let user = users[0];
            let result = await bcrypt.checkPassword(password, user.password);
            if (result) {
                console.log('user is: ' + user);
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect credentials' });
            }
        } catch (err) {
            return done(err);
        }
    }
));

// Local signup strate
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},
    async (req, email, password, done) => {
        try {
            let users = await knex('users').where({ name: req.body.username });
            if (users.length > 0) {
                return done(null, false, { message: 'username already taken' });
            }
            let emails = await knex('users').where({ email: email });
            if (emails.length > 0) {
                return done(null, false, { message: 'this email already registered' });
            }
            let hash = await bcrypt.hashPassword(password)
            const newUser = {
                name: req.body.username,
                email: email,
                password: hash,
                birthday: req.body.birthday,
                gender: req.body.gender
            };

            let userId = await knex('users').insert(newUser).returning('id');
            newUser.id = userId[0];
            console.log('new user created' + newUser)
            done(null, newUser);
        } catch (err) {
            done(err);
        }

    })
);

//Google strategy
passport.use(
    new GoogleStrategy({
        //option for the google strat
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback funtion
        try {
            let users = await knex('users').where({ googleid: profile.id });
            if (users.length > 0) {
                let currentUser = users[0];
                console.log('user is: ' + currentUser);
                return done(null, currentUser);
            } else {
                const newUser = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleid: profile.id,
                };
                let userId = await knex('users').insert(newUser).returning('id');
                newUser.id = userId[0];
                console.log('new user created' + newUser)
                done(null, newUser);
            }
        } catch (err) {
            return done(err);
        }
    }
    )
);

//Facebook strategy
passport.use('facebook',
    new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['id','displayName','emails','photos']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let users = await knex('users').where({facebookid: profile.id });
            if (users.length > 0) {
                let currentUser = users[0];
                console.log('user is: ' + currentUser);
                return done(null, currentUser);
            } else {
                const newUser = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    facebookid: profile.id,
                };
                let userId = await knex('users').insert(newUser).returning('id');
                newUser.id = userId[0];
                console.log('new user created' + newUser)
                done(null, newUser);
            }
        } catch (err) {
            return done(err);
        }
        
    })
)