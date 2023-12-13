const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');


// Calculate the average of the numbers
app.get('/mean', (req, res, next) => {
    try {
        let nums = convertAndValidateNumsArray(req.query.nums);
        let result = {
            operation: "mean",
            result: findMean(nums)
        };
        return res.send(result);
    } catch (error) {
        next(error);
    }
});

app.get('/mean', (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }
    let nums = convertAndValidateNumsArray(req.query.nums);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    let result = {
        operation: "mean",
        result: findMean(nums)
    };
    return res.send(result);
});

// Sort the numbers and find the middle value
app.get('/median', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }
    let nums = convertAndValidateNumsArray(req.query.nums);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "median",
        result: findMedian(nums)
    };

    return res.send(result);
});

// mode calculation route
app.get('/mode', function (req, res, next) {
    // Similar structure as the '/mean' and '/median' routes
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }
    let nums = convertAndValidateNumsArray(req.query.nums);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "mode",
        result: findMode(nums)
    };

    return res.send(result);
});

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});


// Start server
app.listen(3000, function () {
    console.log(`Server starting on port 3000`);
});
