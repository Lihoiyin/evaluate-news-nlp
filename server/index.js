let projectData = {};

//const dotenv = require('dotenv'); i tried too many times to port the env variables to formHander.js but failed, i will fetch the api data in server next time
//or have any method to pass the env variables to another file?
//dotenv.config();
//const key = process.env.API_KEY;


const fetch = require('node-fetch');
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')


// Start express
const app = express()

// Cors
const cors = require('cors');
app.use(cors());
// body-parper
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/addData', (req, res ) =>{
    projectData['polarity'] = req.body.polarity;
    projectData['agreement'] = req.body.agreement;
    projectData['subjectivity'] = req.body.subjectivity;
    projectData['confidence'] = req.body.confidence;
    projectData['irony'] = req.body.irony;
    console.log(projectData);
    res.send(projectData);
})

app.listen(8000, () =>{
    console.log("Hello, here's the port： 8000！");
})
