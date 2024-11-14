const { SchemaTypes,Schema, model } =require("mongoose");



const userSchema=new Schema({
    "Name":{
        type:SchemaTypes.String,
        require:true,
        minLength:1,
        maxLength:15
    },
    "Email":{
        type:SchemaTypes.String,
        require:true,
    },
    // "Postedby": {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Post",
    //     required: true
    // },
});
const User = model("User",userSchema);

module.exports=User