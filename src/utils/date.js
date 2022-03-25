let convertOutputDate = (date, isToday=false) => {
    try {
        if(isToday)
            return moment().format("DD-MM-YYYY");
        if(!date)
            return null;

        if( moment(date, "YYYY-MM-DD HH:mm:ss", true).isValid() )
            return moment(date, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
        if( moment(date, "YYYY-MM-DD", true).isValid() )
            return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY HH:mm:ss");
        return null;
    } catch (e) {
        console.log(`ERROR: convertOutDate || ${e}`);
        return e.message
    }
};


module.exports={
  convertOutputDate
}