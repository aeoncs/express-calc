const ExpressError = require('./expressError')

// Check that inputs are valid numbers

function parseNums(nums) {
     if (!nums) {
        throw new ExpressError('You must provide a list of numbers separated by commas.', 400 );
    } 

    const numArray = nums.split(',').map(Number);

    if (numArray.some(isNaN)) {
        throw new ExpressError("All values must be valid numbers.", 400);
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

module.exports = {
    parseNums,
    calculateMean,
    calculateMedian,
    calculateMode
};