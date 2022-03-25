String.prototype.isInteger = function () {
    let inp = this;
    inp = inp.replace(/[a-zA-Z!@#$%^&*(){};'.,+|-]/g, "");
    if(this == inp) return parseInt(inp);
    else return false
};

String.prototype.resEmpty = function () {
    return `Trường ${this} không được bỏ trống`;
};

String.prototype.resNoExist = function () {
    return `Trường ${this} không tồn tại trong hệ thống`;
};

String.prototype.ise = function () {
    return `Internal Server Error`;
};

/**
 * {'trường*định dạng'}
 */
String.prototype.resWrong = function () {
    return `Sai định dạng ${this}`;
};
