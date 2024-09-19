function error(message,code){
    let e = Error(message);

    if(code){
        e.statusCode = code;

    }return e
}
module.exports = error;