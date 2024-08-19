# Advanced Calculator

## Overview

- This is a Node.js Express application that provides a simple API to calculate the mean, median, and mode of a list of numbers.
- Designed to demonstrate basic Express routing, error handling, and the use for mathematical calculations.
- Developed using Node.js and Express, this application demonstrates basic API development with error handling and utility functions

## Features

- Calculate mean, median, and mode of a set of numbers.
- Error handling for invalid inputs.

## Setup

- `npm install`
- `node app.js`

## Usage

The API supports 3 endpoints that accept a query parameter nums, which should be a comma-separated list of numbers.
Here are examples of how to use each endpoint:

- Mean

```bash
GET /mean?nums=1,2,3,4,5
```

- Median

```bash
GET /median?nums=1,2,3,4,5
```

- Mode

```bash
GET /mode?nums=1,1,2,3,4
```

### Example Usage

To calculate Mean: http://localhost:3000/mean?nums=1,2,3,44  
To calculate Median: http://localhost:3000/mean?nums=5,3,1,4,2  
To calculate Mode: http://localhost:3000/mean?nums=1,2,2,3,3,3

The response will be in JSON format:
{"operation":"mean","result":12.5}
