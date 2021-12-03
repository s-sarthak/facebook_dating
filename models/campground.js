var mongoose=require("mongoose");

var campgroundSchema= new mongoose.Schema({
  name: String, image:String, desc: String, id: String, 
    comments: [
   {
   	type:mongoose.Schema.Types.ObjectId, ref:"Comment"
   } 
  ],
  links: [
   {
    type:mongoose.Schema.Types.ObjectId, ref:"Link"
   } 
  ]

});

module.exports = mongoose.model("Campground",campgroundSchema);

//SCHEMA SETUP


//var Campground= mongoose.model("Campground",campgroundSchema);
/*
Campground.create(
  {name:"Sarthak", image:"https://image.shutterstock.com/display_pic_with_logo/578401/762344239/stock-photo-new-york-new-york-usa-skyline-762344239.jpg",
  desc:"First CAmp"
},function(err,campground){
   if(err){console.log(err);}
   else {console.log("Newly created camp");
        console.log(campground);}
}); 

var campgrounds=[
    {name:"Sarthak", image:"https://image.shutterstock.com/display_pic_with_logo/578401/762344239/stock-photo-new-york-new-york-usa-skyline-762344239.jpg"},
    {name:"abcd", image:" "},
    {name:"xyz", image:"https://cdn.pixabay.com/photo/2017/05/09/03/47/buildings-2297210__480.jpg"},
    {name:"Sarthak", image:"https://image.shutterstock.com/display_pic_with_logo/578401/762344239/stock-photo-new-york-new-york-usa-skyline-762344239.jpg"},
    {name:"abcd", image:"https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg"},
    {name:"xyz", image:"https://cdn.pixabay.com/photo/2017/05/09/03/47/buildings-2297210__480.jpg"},
    {name:"Sarthak", image:"https://image.shutterstock.com/display_pic_with_logo/578401/762344239/stock-photo-new-york-new-york-usa-skyline-762344239.jpg"},
    {name:"abcd", image:"https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg"},
    {name:"xyz", image:"https://cdn.pixabay.com/photo/2017/05/09/03/47/buildings-2297210__480.jpg"}


  ]
*/