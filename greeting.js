let currentDate = new Date();

global.data = currentDate;

module.exports.getMessage = function(){
    let hour = currentDate.getHours();
    if (hour>16)
        return("Good morning, " + global.name);

    else if(hour>10)
        return ("Good afternoon, " + name);

    else
        return ("Good evening, " + name);
}