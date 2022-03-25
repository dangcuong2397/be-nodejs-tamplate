const {check, isEmpty} = require('./checkData');
const {Op} = require('sequelize');
const convert = require('../controler/base/convert');

/**
 * 
 * @param {'req.query'} req 
 * @param {'object'} arrFilter 
 * @param {isInt,isNumber,isTextOnly,isText,isDate,isEmpty} type 
 * @param {'true: sẽ convert text sang số'} convert 
 * @param {trả về lỗi nếu empty} require 
 * @param {nếu_queryKEY_khác_KEY} value 
 * @param {Không cần kiểm tra gán giá trị luôn} next 
 * @return {object} object đã lọc
 */
function handConditionSequlize(req,arrFilter) {
    for (const key in arrFilter) {
        let option = arrFilter[key];
        value = option['value'] || req[key];
        // nếu jump thì gán biến và nhảy qua TH sau
        if(option.jump===true){
            // convert to number
            if( option['convert'] === true ){
                if(option['type'] === "isInt" && typeof(value) === "string") value = parseInt(value);
                if(option['type'] === "isNumber" && typeof(value) === "string") value = parseInt(value);
            }
            if(typeof(value) !== "object") arrFilter[key] = value; // val = number,string
            else arrFilter[key] = {[Op.or]: value};                // val = array
            continue;
        }
        // check require
        if(option.require && isEmpty(value)) return (`Trường ${key} không được để trống`)
        if(!!value){ // neu co value thi sua bien arrFilter thanh dang condition sequelize
            // check type
            if(check(option['type'],value) !== true) return (`Lỗi định dạng trường ${key}:${option['type']}`);
            // convert to number
            if( option['convert'] === true ){
                if(option['type'] === "isInt" && typeof(value) === "string") value = parseInt(value);
                if(option['type'] === "isNumber" && typeof(value) === "string") value = parseInt(value);
            }
            // handle value
            if(typeof(value) !== "object") arrFilter[key] = value; // val = number,string
            else arrFilter[key] = {[Op.or]: value};                // val = array
        } else{
            delete arrFilter[key] //neu khong co value thi xoa trong arrFilter
        }
    }
    return arrFilter;
}


function dateRange(res,fromDate,toDate,fieldDB) {
    try {
        fromDate = convert.convertInputDate(fromDate);
        if(!!toDate){
            if(toDate.length > 10){
                toDate = convert.convertInputDate(toDate);
            } else{
                toDate = convert.convertInputDate(toDate + " 23:59:59");
            }
        }
        if(!!fromDate && !!toDate) res[fieldDB] = {[Op.between]: [fromDate, toDate]};
        else if(!!fromDate)  res[fieldDB] = {[Op.gte]: fromDate};
        else if(!!toDate)  res[fieldDB] = {[Op.lte]: toDate};
        return res;
    } catch (error) {
        console.log("dateRange -> error", error)
    }
}

function dropLog (list){
    try {
        for (let i = 0; i < list.length; i++) {
            const step = list[i];
            step.modal.destroy(
                {
                    where: { id: id }
                }
            );
        }
        return true;
    } catch (error) {
        return("".ise())
    }
}

module.exports={
    handConditionSequlize: handConditionSequlize,
    dateRange: dateRange,
    dropLog: dropLog,
}