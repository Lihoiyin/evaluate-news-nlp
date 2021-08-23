let projectData = {};
  
const dotenv = require('dotenv');
dotenv.config();



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

app.post('/addData', async(req, res) => {
    const link = req.body.link
    const key = process.env.API_KEY;    
    console.log(`Your API Key is ${process.env.API_KEY}`);
    console.log(link)
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&url=${link}&lang=en`)
    try {
        const receivedData = await response.json();
        console.log(receivedData);
        projectData['polarity'] = receivedData.score_tag;
        projectData['agreement'] = receivedData.agreement;
        projectData['subjectivity'] = receivedData.subjectivity;
        projectData['confidence'] = receivedData.confidence;
        projectData['irony'] = receivedData.irony;
        console.log(projectData);
        res.send(projectData);
    }
    catch (err) {
        console.error("Something went wrong")
        console.error(err)
    }
})

app.listen(8000, () =>{
    console.log("Hello, here's the port： 8000！");
})
