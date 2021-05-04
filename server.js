const express = require('express');
const app = express();
const port = 3000;
const db = require("./app/models");
const dbconfig = require("./app/config/db.config");

app.listen(port,()=>{
    console.log("App is runnion on port number " + port);
});

app.get("/",(req,res)=>{
    res.send("Welcome to Authentication and Authorization");
}) 

db.mongoose.connect(`mongodb://${dbconfig.HOSTNAME}:${dbconfig.PORT}/${dbconfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log(err);
    process.exit();
})


require("./app/routes/user.route")(app);