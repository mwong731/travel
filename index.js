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

app.engine('handlebars', hb({
    defaultLayout: 'main',
    helpers: {
        //attraction page generate html code 
        genRateHtmlString: function (rate) {
            let string = `<div id="review-star">`;
            for (let i = 0; i < rate; i++) {
                string += `<i class="fas fa-star"></i>`;
            }
            for (let j = 0; j < 5 - rate; j++) {
                string += `<i class="far fa-star"></i>`;
            }
            string += `</div>`;
            return string;
        },
        genAttractionImageHtmlString: function (attractionImage) {
            //console.log(attractionImage[0].image);
            let string = "";
            for (let i = 0; i < attractionImage.length; i++) {
                string += (i == 0 ? `<div class="carousel-item active">` : `<div class="carousel-item">`);
                string += `<img class="d-block carousel-image" src=${attractionImage[i].image}></div>`;
            }
            return string;
        }
    }
})); //so that handlebar files can be used
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

const attractionRouter = require('./routes/attractionRoutes');
const cityRouter = require('./routes/city-routes')
const cityService = require('./service/cityService')
const cityAttractionRouter = require('./routes/city-attraction-route')

const bookmarkRouter = require('./routes/bookmark-routes')
const bookmarkService = require('./service/bookmarkService')

const attractionAPIRouter = require('./routes/attraction-api-routes');

const attractionService = require('./service/attractionService');
const attractionCommentService = require('./service/attractionCommentService');
const attractionImageService = require('./service/AttractionImageService');

const addRouter = require ('./routes/add-routes')
const UserSubmitAttractionService =  require('./service/userSubmitAttractionService')

app.use('/', new ViewRouter().router()); // only requests to '/' will be sent to new router
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/attraction',
    new attractionRouter(
        new attractionService(db),
        new attractionCommentService(db),
        new attractionImageService(db),
        new bookmarkService(db)
    ).router()
);
app.use('/api/attraction',new attractionAPIRouter(new attractionService(db)).router());


// app.use('/profile',profileRoutes);
// app.use('/profile', profileRoutes);
app.use('/city', new cityRouter(new cityService(db)).router());
app.use('/api/city', new cityAttractionRouter(new cityService(db)).router());
app.use('/api/bookmark', new bookmarkRouter(new bookmarkService(db)).router())
app.use('/add', new addRouter(new UserSubmitAttractionService(db)).router())

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