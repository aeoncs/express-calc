const express = require('express');
const app = express();
const ExpressError = require('./expressError')
const { parseNums, calculateMean, calculateMedian, calculateMode } = require('./helpers');



// routes

app.get('/', function (req, res) {
    res.send('Welcome to the Express Calculator! Use the /mean, /median, or /mode endpoint with a "nums" query parameter to calculate the mean, median, or mode of a list of numbers.');
});

app.get('/mean', function (req, res, next) {
    
    try {
        const numArray = parseNums(req.query.nums);
        const mean = calculateMean(numArray);
        return res.json({operation: "mean", value: mean});
    } catch (error) {
        next(error)
    }
  
});
  

app.get('/median', function (req, res, next) {
   try {
        const numArray = parseNums(req.query.nums);
        const median = calculateMedian(numArray);
        return res.json({operation: "median", value: median});
    } catch (error) {
        next(error)  
    
   }
});


app.get('/mode', function (req, res, next) {
    try {
        const numArray = parseNums(req.query.nums);
        const mode = calculateMode(numArray);
        return res.json({operation: "mode", value: mode});
    } catch (error) {
        next(error)
    }
});



app.use((error, req, res, next) => {
    // default status 500
    let status = error.status || 500
    let message = error.message;

    // set status alert user
    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, function () {
    console.log('Server started on port 3000');
})

