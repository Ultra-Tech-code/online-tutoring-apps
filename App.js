const mongoose = require("mongoose")
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");




app.use(authRoutes);
app.use((req, res) => {
    res.send("<h1>Welcome to my app</h1>");
  });

const monngodb_url= "mongodb+srv://BlackAdam:aurthur27@cluster0-cl1zv.mongodb.net/test?retryWrites=true&w=majority";

mongoose
.connect( monngodb_url,
{ useNewUrlParser: true,
  useUnifiedTopology: true }
)
.then(result => {
console.log("Database connected");
app.listen(3000);
})
.catch(err => console.log(err));

