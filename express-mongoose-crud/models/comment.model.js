const { SchemaTypes, Schema, model } = require("mongoose");



const commentSchema = new Schema({
    "Text": {
        type: SchemaTypes.String,
        require: true,
        minLength: 1,
        maxLength: 300
    },
    "User": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    "Post": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
});
const Comment = model("Comment", commentSchema);

module.exports = Comment