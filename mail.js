const express= require("express")
const nodemailer = require('nodemailer');

const app=express();
const auth={};

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port:2525,
    secure:false,
    requireTLS:true,
  
  
    auth: {
      user: "0aaeb3b434520b",
      pass: "079dd933b17923",
    }
  });
