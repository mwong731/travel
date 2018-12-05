const express = require('express');
const hb = require('express-handlebars');
<<<<<<< HEAD
const bodyParser = require('body-parser');
const expressSession = require('express-session')
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
=======
const db = require('./database-init.js').knex;
>>>>>>> 50d063a64b51bba79928586243cf9dc592abafc3

//Set up app(unpackage express)
let app = express();

/*handlebars*/
app.engine('handlebars', hb({ defaultLayout: 'main' })); //so that handlebar files can be used
app.set('view engine', 'handlebars');

app.use(express.static("public"));

//Set up routes
const authRoutes =require('./routes/auth-routes');
const ViewRouter = require('./routes/viewRouter');

app.use('/',new ViewRouter().router()); // only requests to '/' will be sent to new router
app.use('/auth',authRoutes);

//Use body parser
app.use(bodyParser.urlencoded({extended: false}));
//Set up express sessions - with the secret to encode the session
app.use(expressSession({secret: 'thisRealSecret'}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());



app.listen(8080,()=>{
    console.log("Application started at port:8080");
});