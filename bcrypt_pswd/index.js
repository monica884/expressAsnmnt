
require("dotenv").config();
const express = require("express")
const { mongoose } = require("mongoose");
const { connectDb, initUsers } = require('./data/user')
const userRouter = require('./routers/user.routes');

const app = express()
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1/users', userRouter)

app.all("*", (req, res) => {
    return res.status(404).send('not found')
})

connectDb().then(() => {

    //console.log("done");
    // initUsers()

    app.listen(port, host, () => {
        console.log(`http server is ready on ${host}:${port}`);
    });
})
