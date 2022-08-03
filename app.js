const express=require("express")

const bodyParser = require('body-parser');

const session = require("express-session")
//const MongoDBStore = require("connect-mongodb-session")(session)
const app=express();

global.__basedir = __dirname;
//const Store = MongoDBStore(session)
require("./db")

//store mongoDB


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(
  //session({
    //Store : new MongoDBStore({ client:MONGODB_URI }),
    //secret: 'my secret',
    //resave: false,
    //saveUninitialized: false, 
    
 // })
//);

//routes

const employRoutes = require("./routes/routes"); 
app.use('/', employRoutes);

//app.use((req, res, next) => {
//  if (!req.session.user) {
  //  return next();
 // }
//})





app.get('/',(req,res)=>{
  res.send("<h1>welcome to employee api</h1>")
})








app.listen(4000);