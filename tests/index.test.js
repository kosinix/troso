
const troso = require('../index.js');
const fs = require('fs');
const path = require('path');


const clearTestData = () => {
    // clear dir
    let directory = 'tests/data'
    let files = fs.readdirSync(directory);
    for (const file of files) {
        if (file !== '.gitignore') {
            fs.unlinkSync(path.join(directory, file));
        }
    }
}

beforeEach(() => {
    clearTestData()
});

afterEach(() => {
    clearTestData()
});

test('Test TransportFile log', () => {
    let file = 'tests/data/log.txt'
    let logger = new troso.Logger({
        transports: [
            new troso.transports.File(file)
        ]
    });

    logger.log(1, 2, 3, 'four', ['an', 'array', 2], { an: 'object' }, undefined, true, false, Math.floor)

    let content = fs.readFileSync(file, { encoding: 'utf-8' })
    expect(content).toContain('1 2 3 four ["an","array",2] {"an":"object"}  true false function floor() { [native code] }');
});

test('Test TransportDailyFile log', () => {
    let directory = 'tests/data'
    let file = new Date().toISOString().slice(0, 10) + '.txt'
    let logger = new troso.Logger({
        transports: [
            new troso.transports.DailyFile({
                directory: 'tests/data'
            })
        ]
    });

    logger.log(1, 2, 3, 'four', ['an', 'array', 2], { an: 'object' }, undefined, true, false, Math.floor)

    let content = fs.readFileSync(directory + '/' + file, { encoding: 'utf-8' })
    expect(content).toContain('1 2 3 four ["an","array",2] {"an":"object"}  true false function floor() { [native code] }');
});
