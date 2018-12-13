const express = require('express');
const hb = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const db = require('./config/database-init.js').knex;

//Set up app(unpackage express)
let app = express();


require('dotenv').config();

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
        },
        genAttractionSelectString: function (attractionType, optionValue) {
            //console.log(attractionType + " " + optionValue);
            if (attractionType == optionValue) {
                return "selected";
            } else {
                return "";
            }
        },

        genCitySelectString: function (cityid, attractionCityid) {
            // console.log(cityid + " " + attractionCityid);
            if (cityid == attractionCityid) {
                return "selected";
            } else {
                return "";
            }
        }

    }
})); //so that handlebar files can be used
app.set('view engine', 'handlebars');

app.use(express.static("public"));

//Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setup coockie session
app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE_KEY]
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());


//Set up routes
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const ViewRouter = require('./routes/viewRouter');

const attractionRouter = require('./routes/attraction-routes');
const editAttractionRouter = require('./routes/edit-attraction-routes');
const cityRouter = require('./routes/city-routes')
const cityService = require('./service/cityService')
const cityAttractionRouter = require('./routes/city-attraction-route')

const bookmarkRouter = require('./routes/bookmark-routes')
const bookmarkService = require('./service/bookmarkService')

const attractionAPIRouter = require('./routes/attraction-api-routes');

const attractionService = require('./service/attractionService');
const attractionCommentService = require('./service/attractionCommentService');

const attractionImageAPIRouter = require('./routes/attraction-image-api-routes');
const attractionImageService = require('./service/AttractionImageService');

const addRouter = require('./routes/add-routes');
const UserSubmitAttractionService = require('./service/userSubmitAttractionService');

const planRoutes = require('./routes/plan-routes');
const planService = require('./service/planService');

const adminRouter = require('./routes/admin-routes');


app.use('/', new ViewRouter().router()); // only requests to '/' will be sent to new router
app.use('/auth', authRoutes);
app.use('/profile', new profileRoutes(new UserSubmitAttractionService(db)).router());
app.use('/attraction',
    new attractionRouter(
        new attractionService(db),
        new attractionCommentService(db),
        new attractionImageService(db),
        new bookmarkService(db)
    ).router()
);
app.use('/plan', new planRoutes(new planService(db)).router());
app.use('/api/attraction', new attractionAPIRouter(new attractionService(db), new attractionImageService(db)).router());
app.use('/city', new cityRouter(new cityService(db)).router());

app.use('/attraction/edit', new editAttractionRouter(new attractionService(db), new attractionImageService(db), new cityService(db)).router());

app.use('/api/city', new cityAttractionRouter(new cityService(db)).router());
app.use('/api/bookmark', new bookmarkRouter(new bookmarkService(db)).router());
app.use('/add', new addRouter(new cityService(db)).router());

app.use('/api/attraction-image/', new attractionImageAPIRouter(new attractionImageService(db)).router());
app.use('/admin', new adminRouter(new UserSubmitAttractionService(db)).router());



app.get('/error', (req, res) => {
    res.render('error')
})

//Set up https
const https = require('https');
const fs = require('fs');
const options = {
    cert: fs.readFileSync('./config/localhost.crt'),
    key: fs.readFileSync('./config/localhost.key')
};

https.createServer(options, app).listen(3000);


//Set up express sessions - with the secret to encode the session
// const expressSession = require('express-session')
// app.use(expressSession({
//     secret: 'thisRealSecret',
//     resave: true,
//     saveUninitialized: true
// }));
