const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
require('dotenv').config();

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})


app.post("/",(req,res)=>{
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email =  req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName  
                }
            }
        ]
    }

    const jasonData = JSON.stringify(data);

    const url = process.env.MAILCHIMP_URL;

    const options ={
        method: "POST",
        auth: process.env.MAILCHIMP_AUTH
    }

    const request = https.request(url, options, (responce)=>{

        
        responce.on("data", (data)=>{
            
            
        })

        if(responce.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
    })

    request.write(jasonData);
    request.end();
    
    
})

app.post("/failure", (req,res)=>{
    res.redirect("/");
})









app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running on port 3000");
})


