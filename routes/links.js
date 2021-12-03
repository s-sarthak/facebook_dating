var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Link = require("../models/link");


// =====================
// Comments Routes
// =====================

router.get("/campgrounds/:id/links/new", isLoggedIn ,function(req,res){
   Campground.findById(req.params.id,function(err,campground){
      if(err){console.log(err);}
      else{
        res.render("links/new", {campground:campground});
      }
   });
});

router.post("/campgrounds/:id/links",isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,campground){
    if(err){console.log(err); res.redirect("/campgrounds");}
    else{
       Link.create(req.body.link,function(err,link){
          if(err){console.log(err);}
          else{
            link.author.id = req.user._id;
            link.author.username= req.user.username;
            link.save();
            campground.links.push(link);
            campground.save();

            res.redirect("/campgrounds/" + campground._id);
          }
       });
    }
  });
});

//middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){return next();}
  res.redirect("/login");
}

module.exports=router;