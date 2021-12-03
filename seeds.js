 var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var Link    = require("./models/link");

var data=[
    
    {name:"Computer Graphics", 
    image:"http://mybscit.com/wp-content/uploads/2016/07/mybsict-cg-480x397.png",
    desc:"Class 1 - 3/3/18"},
    {name:"Data Structures", 
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDLv2eROzaiOqMm_vgDLndXUgD_5ChlfYpeayjFD6KSAtR_6lB",
    desc:"Class 2 - 4/3/18"},
    {name:"Algorithms", 
    image:"data:image/jpeg;base64,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",
    desc:"Class 3 - 5/3/18"},
    {name:"DBMS", 
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjhS3A2H510hdK4pEYWxhOVDZP3ANUoj2ShpWUhJ8XIzAAg9u",
    desc:"Class 4 - 7/3/18"},
    {name:"Operating Systems", 
    image:"data:image/jpeg;base64,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",
    desc:"Class 1 - 3/3/18"}

  ]
// /?fields=photos{images}
function seedDB(){
  Campground.remove({},function(err){
	    if(err){console.log(err); }
	    
	    console.log("removed");
	    data.forEach(function(seed){
	      Campground.create(seed,function(err,campground){
	        if(err){console.log(err);}
	        else{
                    console.log("added"); 
                     Comment.create({
                        text: "Class Started" ,
                        author: "Professor"
                     },function(err,comment){
                     	if(err){console.log(err);}
                     	else{
                     		campground.comments.push(comment);
                     		//campground.save();
                     		console.log("new commment");
                     	}
         
                     });
                     

	            }
	      });
	  }); 
  });

}

module.exports =seedDB; 