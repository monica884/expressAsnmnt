
const express=require('express');
const app=express();
require('dotenv').config();
const { mongoose } = require("mongoose");
const {ModelPost,ModelUser}=require('./routes/userRoutes')
const usersRouter=require("./routes/userRoutes");

async function ConnectDB() {
    await mongoose.connect(process.env.CON_STR)
}



const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/api/v1/users", usersRouter)

app.all("*", (req, res) => {
    return res.status(404).send("not found");
})



ConnectDB().then(result=>{
    console.log("db connected");
    app.listen(port, host, () => {        
        console.log(`http server is ready on ${host}:${port}`);
    });
 })

 