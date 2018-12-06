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

//Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Set up express sessions - with the secret to encode the session
app.use(expressSession({
    secret: 'thisRealSecret',
    resave: true,
    saveUninitialized: true
}));

//Set up routes
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const ViewRouter = require('./routes/viewRouter');


const attractionService = require('./service/attractionService');
const attractionCommentService = require('./service/attractionCommentService');
const attractionRouter = require('./routes/attractionRoutes');
const attractionCommentRouter = require('./routes/attractionRoutes');


app.use('/', new ViewRouter().router()); // only requests to '/' will be sent to new router
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api/attraction', new attractionRouter(new attractionService(db)).router());
app.use('/api/attractioncomment', new attractionCommentRouter(new attractionCommentService(db)).router());
// app.use('/profile',profileRoutes);

app.get('/error', (req, res) => {
    res.send('error occurred')
})



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