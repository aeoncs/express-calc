class ExpressError extends Error {
    constructor(msg, status) {
        super(msg); 
        this.status = status;
        console.error(this.stack)
    }
}

module.exports = ExpressError;