const express = require('express');
const hb = require('express-handlebars');
const bodyParser = require('body-parser');
const expressSession = require('express-session')
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const db = require('./config/database-init.js').knex;

//Set up app(unpackage express)
let app = express();

/*handlebars*/
app.engine('handlebars', hb({ defaultLayout: 'main' })); //so that handlebar files can be used
app.set('view engine', 'handlebars');

app.use(express.static("public"));

//Set up routes
const authRoutes =require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const ViewRouter = require('./routes/viewRouter');

app.use('/',new ViewRouter().router()); // only requests to '/' will be sent to new router
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/error',(req,res)=>{
    res.send('error occurred')
})

//Use body parser
app.use(bodyParser.urlencoded({extended: false}));
//Set up express sessions - with the secret to encode the session
app.use(expressSession({secret: 'thisRealSecret'}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());


//Set up https
const https = require('https');
const fs = require('fs');
const options = {
    cert: fs.readFileSync('./config/localhost.crt'),
    key: fs.readFileSync('./config/localhost.key')
  };

https.createServer(options, app).listen(3000);