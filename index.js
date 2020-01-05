/**
 * A simple logging utility that uses built-in modules
 */

//// Core modules
const fs = require('fs');
const path = require('path');

//// External modules

//// Modules


/**
 * Main class
 */
class Logger {
    constructor(opts) {
        let defaults = {
            transports: [new TransportConsole()]
        };
        opts = Object.assign(defaults, opts);
        this.transports = opts.transports;
    }
    log() {
        for (let i = 0; i < this.transports.length; i++) {
            this.transports[i].log(...arguments);
        }
    }
}

class TransportConsole {
    /**
     * 
     * @param {Object} opts Additional options.
     */
    constructor(opts) {
        let defaults = {
            /**
             * Format the log message. Default formatter does nothing. lol.
             */
            formatter: (message) => {
                return message;
            }
        };
        opts = Object.assign(defaults, opts);
        this.formatter = opts.formatter;
    }
    log() {
        let args = arguments
        for (var i in arguments) {
            args[i] = this.formatter(arguments[i])
        }
        console.log(...args);
    }
}

class TransportFile {
    /**
     * 
     * @param {String} fileName File name of the log file.
     * @param {Object} opts Additional options.
     */
    constructor(fileName, opts) {
        let defaults = {
            /**
             * Format the log message. Default formatter prepends a date time and appends a new line
             */
            formatter: (message) => {
                let today = new Date();
                if (typeof message === 'object') {
                    message = JSON.stringify(message)
                }
                return `${today.toISOString()}: ${message} ${"\n"}`
            },
            /**
             * Format each arguments passed on log(). Default formatter stringifies an object.
             */
            argFormatter: (arg) => {
                if (typeof arg === 'object') {
                    arg = JSON.stringify(arg)
                }
                return arg
            },
        };
        opts = Object.assign(defaults, opts);
        this.fileName = fileName;
        this.formatter = opts.formatter;
        this.argFormatter = opts.argFormatter;
    }
    log() {
        let args = []
        for (var i in arguments) {
            args.push(this.argFormatter(arguments[i]))
        }
        let message = args.join(" ")
        fs.writeFileSync(this.fileName, this.formatter(message), { flags: 'a' })
    }
}

class TransportDailyFile {
    /**
     * 
     * @param {*} opts 
     */
    constructor(opts) {
        let defaults = {
            /**
             * Directory of logs.
             */
            directory: '',
            /**
             * Format the log message. Default formatter prepends a date time and appends a new line
             */
            formatter: (message) => {
                let today = new Date();
                if (typeof message === 'object') {
                    message = JSON.stringify(message)
                }
                return `${today.toISOString()}: ${message} ${"\n"}`
            },
            /**
             * Format each arguments passed on log(). Default formatter stringifies an object.
             */
            argFormatter: (arg) => {
                if (typeof arg === 'object') {
                    arg = JSON.stringify(arg)
                }
                return arg
            },
            /**
             * Format the file name. Default formatter returns the date today.
             */
            fileNamer: () => {
                return new Date().toISOString().slice(0, 10) + '.txt'
            }
        };
        opts = Object.assign(defaults, opts);
        this.directory = opts.directory;
        this.formatter = opts.formatter;
        this.argFormatter = opts.argFormatter;
        this.fileNamer = opts.fileNamer;
    }
    log() {
        let args = []
        for (var i in arguments) {
            args.push(this.argFormatter(arguments[i]))
        }
        let message = args.join(" ")
        let fileName = path.join(this.directory, this.fileNamer())
        fs.writeFileSync(fileName, this.formatter(message), { flags: 'a' })
    }
}

// Export
module.exports = {
    Logger: Logger,
    transports: {
        Console: TransportConsole,
        File: TransportFile,
        DailyFile: TransportDailyFile
    }
};
