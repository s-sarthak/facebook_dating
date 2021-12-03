var mongoose= require("mongoose");

var linkSchema= mongoose.Schema({
	text: String, 
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User"
		},
		username: String
	}
});

module.exports= mongoose.model("Link",linkSchema); 