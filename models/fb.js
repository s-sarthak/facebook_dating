var mongoose= require("mongoose");


var FbSchema= new mongoose.Schema({
	fbid: String
});

module.exports= mongoose.model("Fb",FbSchema);