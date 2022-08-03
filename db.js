var mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/employapi",{

 useNewUrlparser:true,
 useUnifiedTopology:true,
 

}).then(()  => {
  console.log("connection successfully created");

}).catch((e)=>{
  console.log("connection error");
  
})

 