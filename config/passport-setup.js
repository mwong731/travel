const passport = require('passport');
const bcrypt = require('./bcrypt');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database:process.env.DB_NAME,
        user:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD
    }
});

passport.use('local-login', new LocalStrategy(
    async (name, password, done) => {
        try{
            let users = await knex('users').where({name:name});
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

passport.use('local-signup', new LocalStrategy(
    async (name, password, done) => {
        try{
            let users = await knex('users').where({name:name});
            if (users.length > 0) {
                return done(null, false, { message: 'username already taken' });
            }
            let hash = await bcrypt.hashPassword(password)
            const newUser = {
                name:name,
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

 passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let users = await knex('users').where({id:id});
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
});