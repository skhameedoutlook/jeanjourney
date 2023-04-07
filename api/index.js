const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to mongo"))
.catch((err) => {
	console.log(err);
});

app.use(express.json());
app.use("/api/user", userRoute);

app.listen(process.env.API_PORT || 5000, ()=>{
	console.log("Server listening on port " + process.env.API_PORT);
}) 

