var express = require("express");
var router  = express.Router(); 
var passport= require("passport");
var User    = require("../models/user");

router.get("/", function(req,res){
     //res.send("landing page");
     res.render('landing');
});




//////////////////
// AUTH ROUTES
/////////////////

//show register form
router.get("/register",function(req,res){
   res.render("register");
});

router.post("/register",function(req,res){
     var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err,user){
      if(err){console.log(err);}
       
      passport.authenticate("local")(req,res,function(){
           res.redirect("/campgrounds");
      }); 

   });
});

//show facebook page
router.get("/facebook2",function(req,res){
   res.render("facebook2");
});

router.get("/profile",function(req,res){
   res.render("profile");
});
router.get("/list",function(req,res){
   res.render("list");
});
router.get("/match",function(req,res){
   res.render("match");
});


//show login form
router.get("/login",function(req,res){
   res.render("login");
});

router.post("/login",passport.authenticate("local",
      {
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
    }) , function(req,res){
                
});


//logout
router.get("/logout",function(req,res){
   req.logout();
   res.redirect("/campgrounds");
});

////

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){return next();}
  res.redirect("/login");
}

module.exports=router;