const { SchemaTypes, Schema, model } = require("mongoose");



const postSchema = new Schema({
    "Title": {
        type: SchemaTypes.String,
        require: true,
        minLength: 1,
        maxLength: 15
    },
    "Content": {
        type: SchemaTypes.String,
        require: true,
    },
   
});
const Post = model("Post", postSchema);

module.exports = Post