/**
 * Run: node tests/daily-file.js
 */

const troso = require('../index.js');


let logger = new troso.Logger({
    transports: [
        new troso.transports.DailyFile({
            directory: 'tests'
        })
    ]
});

logger.log(1, 2, 3, 'four', ['an', 'array', 2], { an: 'object' }, undefined, true, false, Math.floor)

