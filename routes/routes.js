const express = require('express');

const router  = express.Router();

const employeeController = require("../controllers/employs");
//const auth=require("../middleware/auth")



//create students
router.post("/addemployee", employeeController.addEmployee)
router.post("/login",employeeController.postLogin);
router.get("/employees",employeeController.getListing);
router.get("/employ/:name",employeeController.individual)
router.post("/uploadfiles", employeeController.uploadFile)
router.get("/files", employeeController.getFilesList)
router.get("/files/:name", employeeController.downloadFiles)

//avg age of employees
router.get("/getaverage",employeeController.getavgage)
//router.get("/mail",auth)

module.exports=router;
