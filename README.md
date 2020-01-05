
# troso
[![npm version](https://badge.fury.io/js/troso.svg)](https://badge.fury.io/js/troso)

*"Ang legal na logger"*


## Install

#### Choose 1 of 3 options:

Install from NPM:

    npm install troso

Install latest from GitHub:

    npm install github:kosinix/troso

Tied to a specific version/release from GitHub:

    npm install github:kosinix/troso#1.1.0
    
## Quickstart


    const troso = require('troso');

    let logger = new troso.Logger({
        transports: [
            new troso.transports.Console()
        ]
    });

    logger.log(1, 2, 3, 'four', ['an', 'array', 2], { an: 'object' }, undefined, true, false, Math.floor)

## File and Multiple Transports

Will log on both console and file tests/log.txt

    const troso = require('../index.js');

    let logger = new troso.Logger({
        transports: [
            new troso.transports.Console(),
            new troso.transports.File('tests/log.txt')
        ]
    });

    logger.log(1, 2, 3, 'four', ['an', 'array', 2], { an: 'object' }, undefined, true, false, Math.floor)

## Daily File

Will log on a file named tests/{YYYY-MM-DD}.txt
This will prevent having a big log file.

    const troso = require('../index.js');

    let logger = new troso.Logger({
        transports: [
            new troso.transports.DailyFile({
                directory: 'tests'
            })
        ]
    });

    logger.log(1, 2, 3, 'four', ['an', 'array', 2], { an: 'object' }, undefined, true, false, Math.floor)

## Transports

* Console - Show logs on console 
* File - Save logs on a file
* DailyFile - Save logs on a new file everyday
