var express = require("express");
var router  = express.Router();
var    Campground = require("../models/campground"); 

// Index Route
router.get("/",function(req,res){
    
    //req.user
    Campground.find({},function(err,allcampgrounds){
      if(err){console.log(err);}
      else{
        res.render("campgrounds/index",{campgrounds:allcampgrounds, currentUser: req.user});
      }
    });
});

//Create Route
router.post("/",isLoggedIn, function(req,res){
   //res.send("You hit the post route");
   var name=req.body.name;
   var image=req.body.image;
   var desc= req.body.desc;
   var newCampground = {name: name, image: image, desc: desc};
   //campgrounds.push(newCampground);
   Campground.create(newCampground,function(err,newlyCreated){
    if(err){console.log(err);}
    else{res.redirect("/campgrounds");}
   });
   //res.redirect("/campgrounds"); //default is get
});

// New Route
router.get("/new",isLoggedIn, function(req,res){
     res.render("campgrounds/new");
});

//Show route
router.get("/:id",function(req,res){ 
    //Campground.findById(req.params.id, function(err,foundCampground){
    Campground.findById(req.params.id).populate("comments").populate("links").exec(function(err,foundCampground){ 
    if(err){console.log(err);}
    else{
      res.render("campgrounds/show",{campground: foundCampground });
      console.log(foundCampground);
        }
    }) ;
  
});

// Edit Campground route
router.get("/:id/edit",function(req,res){
   Campground.findById(req.params.id,function(err,foundCampground){
      if(err){res.redirect("/campgrounds");}
      else{res.render("campgrounds/edit", {campground:foundCampground});}
   });
   
});

// Update Camproung route
router.put("/:id",function(req,res){

   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
      if(err){res.redirect("/campgrounds");}
      else{
        res.redirect("/campgrounds/"+ req.params.id);
      }
   });
});

//middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){return next();}
  res.redirect("/login");
}
module.exports=router;