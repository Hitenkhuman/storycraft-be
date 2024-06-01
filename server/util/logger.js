
/**
 * DEBUG < INFO <  ERROR
 * @name logger
 */
class Logger {

    /**
     * @desc This function is being used to get debug logs
     */
    static debug() {
        console.log.apply(null, arguments);
    }

    /**
     * @desc This function is being used to get info logs
     */
    static info() {
        if (arguments.length) {
            console.info.apply(MOMENT()._d, arguments);
        }
    }

    /**
     * @desc This function is being used to error logs
     */
    static error() {
        console.error.apply(null, arguments);
    }
}

module.exports = Logger;
