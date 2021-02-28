// Setup empty JS array to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`running on port:${port}`);
});

/*GET ROUTE*/
app.get('/all', (req, res) => {
    res.send(projectData);
})
/* POST ROUTES*/
app.post('/all', (req, res) => {
    console.log(req.body);
    projectData["date"] = `${req.body.date}`;
    projectData["temp"] = `${req.body.temp}`;
    projectData["response"] = `${req.body.response}`;
    res.send(projectData);
})
