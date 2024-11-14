const { mongoose } = require("mongoose");
const User = require('../models/user.model');
jwt = require('jsonwebtoken');
require("dotenv").config();


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database Connected");
    } catch (error) {
        console.log(`Failed to connect database ${error}`);
        throw error;
    }
}

const initUsers = async () => {
    try {


        let pass = await bcrypt.hash("12345678", 10);
        const users = [
            { "Name": "Monica", "Email": "monica@evslearning.com", "Password": pass, "Contacts": "0300-1111111" },
            { "Name": "Huma", "Email": "huma@evslearning.com", "Password": pass, "Contacts": "0333-2222222" },
            { "Name": "Iram", "Email": "iram@evslearning.com", "Password": pass, "Contacts": "0333-3333333" },
        ]

        // Use for...of to await each User.create() call

        //     for (const u of users) {
        //         const x = await User.create(u);
        //         console.log(`${x} created`);
        //     }

        // } catch (ex) {
        //     console.log(ex);
        //     throw ex;
        // }
        users.forEach(async (u) => {
            const x = await User.create(u);
            console.log(`${x} created`);
        });
    }
    catch (ex) {
        console.log(ex);
        throw ex;
    }
}






module.exports = {
    initUsers,
    connectDb
}