const  employeeModel = require('../models/employs');
const upload = require("../middleware/Upload")
const  bcrypt    = require("bcryptjs");
const URL = "http://localhost:4000/get-cfiles/";
const fs = require("fs");
var validator = require('validator');
const emailvalidator = require("email-validator");

validator.isEmail('foo@bar.com');



const employeeController = {};
// Create employee 
employeeController.addEmployee = async (req, res, next) => {
    console.log(req.body);
    let email    = req.body.email;
    let password = req.body.password;
///Validate if user exist in our database
    const oldUser = await employeeModel.findOne({email})
    
    
     if (oldUser) {
      return res.status(409).send({success:false,message : "User Already Exist."});
  } 
   encryptedPassword = await bcrypt.hash(password, 10);
   
   if(emailvalidator.validate(req.body.email)){
    // Your call to model here
  }else{
  res.status(400).send('Invalid Email format!');
  }



   employeeModel.create({
        unique_id: req.body.unique_id,
        name: req.body.name,
        email:req.body.email,
        password:encryptedPassword,
        age: req.body.age,
    

     }).then((data) => {
       res.status(200).send({
          success: true,
          statusCode: 200,
          message:data
        })
    }).catch((error) => {
        res.status(400).send({geterror:error})
    });
};
////get login
employeeController.postLogin=async (req, res) => {
  try {
      // Get user input
      const { email, password } = req.body;
      // Validate user input
      if (!(email && password)) {
          res.status(400).send({ 
              success: false,
              statusCode: 400,
              message: "All input is required"
          });
      };
           
           res.status(200).send({success:true,message:"login successfuly"});
           
    
         res.status(400).send({success:false,message : "Invalid Credentials"});

  }

    
      catch(error) {
        res.status(400).send({geterror:error})
    }
  }
  



employeeController.getListing = (req, res, next) => {
    
    employeeModel.find().then((data) => {
       return res.status(200).send({
            success: true,
            statusCode: 200,
            users:data
          })
    }).catch((error) => {
        res.status(400).send({geterror:error})
    });
};



////get individual employee

employeeController.individual   =async(req,res)=>{
    try{
       const _id=req.params.name;
        const employeeData=   await  employeeModel.findById(_id);
        console.log(employeeData);

      if (!employeeData){
        return res.status(404).send();
      }else{
        res.send(employeeData);
      }

        }catch(e){
        res.status(500).send({"message":"internal error"});
    
    }
}
employeeController.getavgage = (req, res, next) => {
    
  employeeModel.find().then((data) => {
    var avgage =0;
    var count =0;
    data.forEach(element => {
      avgage = avgage + element.age;
      console.log(element.age);
      count++;
    });
     var totalaverageage = avgage/count;
     console.log({totalavg:totalaverageage});
     return res.status(200).send({
          success: true,
          statusCode: 200,
          employAvg:totalaverageage
        })
  }).catch((error) => {
      res.status(400).send({geterror:error})
  });
};
employeeController.uploadFile = async (req, res) => {
  try {
    await upload(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Choose a file to upload" });
    }

    res.status(200).send({
      message: "File uploaded successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size should be less than 5MB",
      });
    }

    res.status(500).send({
      message: `Error occured: ${err}`,
    });
  }
};

employeeController.getFilesList = (req, res) => {
  const path = __basedir + "/public/uploads/";

  fs.readdir(path, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Files not found.",
      });
    }

    let filesList = [];

    files.forEach((file) => {
      filesList.push({
        name: file,
        url: URL + file,
      });
    });

    res.status(200).send(filesList);
  });
};

employeeController.downloadFiles = (req, res) => {
  const fileName = req.params.name;
  const path = __basedir + "/public/uploads/";

  res.download(path + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "File can not be downloaded: " + err,
      });
    }
  });
};




module.exports = employeeController;