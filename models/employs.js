var mongoose=require("mongoose")


const employeeSchema= new mongoose.Schema({
         

    unique_id: {
        type:String,
        required:true,

         },

         name:{
           type:String,
           required:true,

        },

        email:{
            type:String,
            required:true,
            unique:true
            
        },
        password: 
    
        {
       type    :  String,
       required:true
 
        },
     

        age:{
            type:Number,
            required:true,

        }

})


const employeeModel=new mongoose.model(`employeeModel`,employeeSchema);

module.exports=employeeModel;