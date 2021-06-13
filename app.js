const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const path = require("path")
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
  }
  const jsonData = JSON.stringify(data);
  const url = 'https://us6.api.mailchimp.com/3.0/lists/fe7670b6fd';
  const options = {
      method: "POST",
      auth: "saurabh1:dcd02b6a733787b8f4a1cc8c0be97204-us6"
  }
  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname, "/failure.html")
    }
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })
  }) 
  //  request.write(jsonData);
   request.end();
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});

// dcd02b6a733787b8f4a1cc8c0be97204-us6
// fe7670b6fd
