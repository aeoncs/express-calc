const express = require('express');
const app = express();

// Check that inputs are valid numbers

function parseNums(nums) {
     if (!nums) {
        throw new Error('You must provide a list of numbers separated by commas.');
    } 

    const numArray = nums.split(',').map(Number);

    if (numArray.some(isNaN)) {
        throw new Error("All values must be valid numbers.");
    }

    return numArray;
}

// math functions

function calculateMean(numArray) {
    const sum = numArray.reduce((acc, num) => acc + num, 0);
    return sum / numArray.length;
}

function calculateMedian(numArray) {
    const sorted = [...numArray].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function calculateMode(numArray) {
    const frequency = {};
    let maxFreq = 0;

    numArray.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
        }
    })

    const modes = Object.keys(frequency).filter(num => frequency[num] === maxFreq).map(Number);

    if (modes.length === Object.keys(frequency).length) {
        return 'No mode'; 
    } 

    return modes.length === 1 ? modes[0] : modes;

}

// routes

app.get('/', function (req, res) {
    res.send('Welcome to the Express Calculator! Use the /mean, /median, or /mode endpoint with a "nums" query parameter to calculate the mean, median, or mode of a list of numbers.');
});

app.get('/mean', function (req, res) {
    
    try {
        const numArray = parseNums(req.query.nums);
        const mean = calculateMean(numArray);
        res.json({operation: "mean", value: mean});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
  
});
  

app.get('/median', function (req, res) {
   try {
        const numArray = parseNums(req.query.nums);
        const median = calculateMedian(numArray);
        res.json({operation: "median", value: median});
    } catch (error) {
        res.status(400).json({error: error.message});   
    
   }
});


app.get('/mode', function (req, res) {
    try {
        const numArray = parseNums(req.query.nums);
        const mode = calculateMode(numArray);
        res.json({operation: "mode", value: mode});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});



app.listen(3000, function () {
    console.log('Server started on port 3000');
})

