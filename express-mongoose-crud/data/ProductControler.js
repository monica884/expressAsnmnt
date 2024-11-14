const dotenv = require('dotenv');
dotenv.config();
const { mongoose } = require("mongoose");
const Post = require("../models/post.model");

// async function ConnectDB() {
//     await mongoose.connect(process.env.CON_STR)
// }

async function ModelPost() {

    await Post.insertMany([
        {
            "Title": "Vegetalbe",
        },
        {
            "Name": "Fruit",
        },

        {
            "Content": "Vegetable 100",
        },
        {
            "Content": "Fruit 100",
        },
        {
            "Postedby": "dummyid",//populate
        },

    ])
}



module.exports = {
    ModelPost,
}