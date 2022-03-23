require("dotenv").config();
const express = require("express");
const app = express()
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter")
const authRouter = require("./routes/authRouter")
const postRouter = require("./routes/postRouter")
const conversationRouter = require("./routes/conversationRouter")
const messageRouter = require("./routes/messageRouter")

//middlewares

app.use(express.json({limit :"30mb", extended : true}));
app.use(express.urlencoded({limit : "30mb", extended : true}))

app.use(cors())


//connect to db
const URI = process.env.MONGODB_URI
mongoose.connect(URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}, err => {
    if(err) throw err;
    console.log("database connected successfully")
})

//server check
app.get("/", (req,res) =>{
    res.send("Server is up and running")
})

//routes
app.use("/api/users" , userRouter) 
app.use("/api/auth" , authRouter)
app.use("/api/posts" , postRouter)
app.use("/api/conversations" , conversationRouter)
app.use("/api/messages" , messageRouter)



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {console.log("Server is running on port", PORT)})