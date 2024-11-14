const dotenv = require('dotenv');
dotenv.config();
const { mongoose } = require("mongoose");
const User = require("../models/user.model");


async function ModelUser() {

    await User.insertMany([
        {
            "Name": "SARA",
            "Email": "SARA@gmail.com"
        },
        {
            "Name": "Hina",
            "Email": "hinahina@gmail.com"
        },
        {
            "Name": "monica",
        },
    ])
}



module.exports = {
    ModelUser,
}