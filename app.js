const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { json } = require("body-parser");

const app=express();

app.use(express.static("public"));//to send css file,images also
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html"); //to send html file
   
});

app.post("/",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
     const data = {
     members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME:fname,
                LNAME: lname
            }
        }
    ]
   };
   
   const jsonData=JSON.stringify(data);
   const url= "https://us21.api.mailchimp.com/3.0/lists/52765a92ca";
   const options={
      method: "POST",
      auth: "pramod1:923a0d3dc9a298b976aa5141c2f90001-us21"
   }

    const request= https.request(url,options,function(response){
         response.on("data",function(data){
            console.log(JSON.parse(data));
         })
   
        })
        request.write(jsonData);
        request.end();

});
//Api key
// 923a0d3dc9a298b976aa5141c2f90001-us21

// list Id
// 52765a92ca

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running at port 3000");
});
