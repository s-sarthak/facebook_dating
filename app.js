var    express    = require("express");
var    app        = express();
var    bodyParser = require("body-parser");
var    mongoose   = require("mongoose");
var    Campground = require("./models/campground"); 
var    seedDB     = require("./seeds");
var    Comment    = require("./models/comment");
var    Link       = require("./models/link");
var    passport   = require("passport");
var    LocalStrategy    = require("passport-local");
var    User             = require("./models/user");
var    Fb               = require("./models/fb");
var    commentRoutes    = require("./routes/comments"),
       linkRoutes       = require("./routes/links"),
       campgroundRoutes = require("./routes/campgrounds"),
       indexRoutes      = require("./routes/index"),
       methodOverride   = require("method-override");


//mongoose.connect("mongodb://localhost/yelp_camp2");
//mongodb://sarthak:sarthak3097@ds243059.mlab.com:43059/s1
mongoose.connect("mongodb://sarthak:sarthak3097@ds243059.mlab.com:43059/s1");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//seedDB();
app.use(methodOverride("_method"));

///// PASSPORT CONFIG
app.use(require("express-session")({
  secret : "Rusty wins",
  resave : false,
  saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   next();
});

// Routes
app.use(indexRoutes);
app.use(commentRoutes);
app.use(linkRoutes);
app.use("/campgrounds",campgroundRoutes);

//Port
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("YElp camp");
});
app.listen(3000);