const throwError = (message, code) => {
    const error = new Error(message || "Cannot get data from server");
    error.code = code || 500;
    throw error;
}

const handleNextError = (err, next) => {
    if(!err.code){
        err.code = 500;
    }
    next(err);
}

module.exports = {
    throwError,
    handleNextError
}