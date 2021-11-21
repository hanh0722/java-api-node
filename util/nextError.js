const nextError = (err, next) => {
    if(!err.code){
        err.code = 500;
    }
    next(err);
}

module.exports = nextError;