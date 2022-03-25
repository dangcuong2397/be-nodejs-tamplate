const moment = require('moment')
function isNumber(data) {
    switch (typeof(data)) {
        case "string":
            let inp = data;
            inp = inp.replace(/[a-zA-Z!@#$%^&*(){};',+|-]/, "");
            if(data == inp) return Number(inp);
            break;
        case "number":
            return typeof(data) === "number"
    }
    return false;
}

function isInt(data) {
    switch (typeof(data)) {
        case "string":
            let inp = data.replace(/[a-zA-Z!@#$%^&*(){};'.,+|-]/, "");
            if(data == inp) return true;
            break;
        case "number":
            return Number.isInteger(data)
    }
    return false;
}

function isTextOnly(data) {
    let dataCMP = data.replace(/[0123456789!@#$%^&*(){};'.,+|-]/, "");
    return data === dataCMP
}

function isText(data,exception) {
    if(!!exception) data = data.replace(exception, "");
    let dataCMP = data.replace(/[!@#$%^&*(){};'.,+|-]/, "");
    return data === dataCMP
}

function isDate(data,format) {
    let leng = data.length;
    if(!format){
        if(leng <= 10)
            return moment(data, "DD-MM-YYYY", true).isValid()
        else
            return moment(data, "DD-MM-YYYY HH:mm:ss", true).isValid()
    } else{
        return moment(data, format, true).isValid()
    }
    
}

function isEmpty(data) {
    if (data === "" || data === null || data === undefined)
        return true;
    if (Array.isArray(data)) {
        if (data.length === 0)
            return true;
    }
    if ((typeof data) === "object") {
        for (let key in data) {
            if (data.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    return false;
}

function isArray(data) {
    return Array.isArray(data)
}

function isObject(data) {
    if( typeof(data) !== "object") return false;
    else{
        return !Array.isArray(data);
    }
}

/**
 * 
 * @param {'isInt,isNumber,isTextOnly,isText,isDate,isEmpty'} type 
 * @param {object} data 
 * @param {boolean} allowEmpty 
 */
function check(type,data,allowEmpty) {
    if(data===undefined){
        if(allowEmpty===0 || allowEmpty===false) return false; 
        if( allowEmpty===undefined || allowEmpty===1 || allowEmpty===true) return true; 
    }
    if( isEmpty(type)) return null;
    if(typeof(type)==="object"){
        return type.includes(data);
    } else{
        switch (type) {
            case "isInt":
                return !!isInt(data)
            case "isNumber":
                return( isNumber(data));
            case "isTextOnly":
                return( isTextOnly(data));
            case "isText":
                return( isText(data));
            case "isDate":
                return( isDate(data));
            case "isEmpty":
                return( isEmpty(data));
            default:
                return null
        }
    }
}

/**
 * 
 * @param {string} field 
 * @param {'isInt,isNumber,isTextOnly,isText,isDate,isEmpty'} type 
 * @param {object} data 
 * @param {boolean} allowEmty 
 */
function checkData(field,type,data,allowEmty) {
    try {
        if(typeof(data) === "object"){
            for (let index = 0; index < field.length; index++) {
                const fd = field[index];
                let checkFd = check(type[index],data[fd],allowEmty)
                if( checkFd === false) return {value:false,error_message: "Lỗi định dang trường "+fd};
                else if( checkFd === null) return {value:null};
            }
            return {value:true};
        } else{

        }
    } catch (error) {
        console.log(error);
        return {value:null};
    }
}

function filterFieldRemovenull(field,data) {
    let result = {};
    for (let index = 0; index < field.length; index++) {
        const fd = field[index];
        if( !isEmpty(data[fd]) ) {
            result[fd] = data[fd]
        }
    }
    return result;
}

function filterFieldArrNextnull(field,data) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        result[i] = {};
        for (let index = 0; index < field.length; index++) {
            const fd = field[index];
            if( !isEmpty(data[fd]) ) {
                result[i][fd] = data[fd]
            }
        }
    }
    return result;
}

/**
 * 
 * @param {Object} ob 
 * @param {'string or {name,label}'} fieldarr 
 */
function checkRequire(ob,fieldarr) {
    for (const field of fieldarr) {
        if(typeof(field)==="string"){
            if( isEmpty(ob[field]) ) return `Trường ${field} không được bỏ trống`;
        } else{
            if( isEmpty(ob[field.name]) ) return `Trường ${field.label} không được bỏ trống`;
        }
    }
    return true;
}
module.exports={
    isNumber : isNumber,
    isInt: isInt,
    isTextOnly : isTextOnly,
    isText : isText,
    isDate: isDate,
    isEmpty: isEmpty,
    isArray: isArray,
    isObject: isObject,
    check: check,
    checkData: checkData,
    filterFieldRemovenull: filterFieldRemovenull,
    filterFieldArrNextnull: filterFieldArrNextnull,
    checkRequire: checkRequire
}
