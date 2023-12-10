const express = require('express');
const app = express();
const ExpressError = require('./expressError');

app.get('/mean', (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    let result = {
        operation: "mean",
        result: findMean(nums)
    };
    return res.send(result);
});

app.get('/median', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "median",
        result: findMedian(nums)
    };

    return res.send(result);
});

app.get('/mode', function (req, res, next) {
    // Similar structure as the '/mean' and '/median' routes
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "mode",
        result: findMode(nums)
    };

    return res.send(result);
});

// Error handling
app.use((err, req, res, next) => {
    // Set the response status code to the error's status or 500 if not specified
    res.status(err.status || 500);

    // Return a JSON response containing the error info
    return res.json({
        error: err,
        message: err.message
    });
});

// Start server
app.listen(3000, function () {
    console.log(`Server starting on port 3000`);
});
