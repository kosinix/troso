# troso
*"Ang legal na logger"*

## Install

    npm install github:kosinix/troso

Tied to a specific version/release

    npm install github:kosinix/troso#1.0.0
    
## Quickstart


    let loggerOk = new troso.Logger({
        transports: [
            new troso.transports.Console() // Displays on console
        ]
    });

## Advance Usage

    //// Core modules
    const util = require('util');

    //// External modules
    const moment = require('moment');
    const troso = require('troso');

    //// Modules


    let loggerError = new troso.Logger({
        transports: [
            new troso.transports.Console(),
            new troso.transports.DailyFile({
                directory: '/home/log',
                formatter: (message) => {
                    let today = moment(); //new Date();
                    return util.format('%s: %s %s', today.utcOffset('+0800').format('YYYY-MM-DD hh:MM:ss A ([UTC]Z)'), message, "\n");
                }
            })
        ],
    });

    let loggerOk = new troso.Logger({
        transports: [
            new troso.transports.Console()
        ]
    });

    loggerOk.log(message);
    loggerError.log(message);


## Transports

* Console - Show logs on console 
* File - Save logs on a file
* DailyFile - Save logs on a new file everyday