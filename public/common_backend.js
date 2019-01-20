// This file specifies common backend functions that can be reused

// UUID Generator from Stack Overflow: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

// Grabbing cookie content with cname (from w3school)
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Date format in the DB is mm/dd/yyyy. Use Date object in JS.
// Getting current week
function getWeek(date) {
    var monday = new Date(date.getTime() - 60*60*24*date.getDay()*1000);  
    var sunday = new Date(date.getTime() + 60*60*24*6*1000);
    return [monday, sunday];
}
// Transforming date into yyyy-mm-dd which vis2d can recognize
function yyyymmdd(date) {
    return (date.getFullYear().toString()
     + '-' + (date.getMonth()<9 ? ('0'+(date.getMonth()+1).toString()) : (date.getMonth()+1).toString())
      + '-' + (date.getDate()<10 ? ('0' + date.getDate().toString()) : date.getDate().toString()));
}

// Trace class
class Trace{
    constructor(fromDate, toDate, mode){
        this.x = [];
        this.y = [];
        this.name = '';
        this.id = '';
        this.mode = mode;
        var interDate = fromDate;
        while(interDate <= toDate){
            this.x.push(yyyymmdd(interDate));
            interDate = new Date(interDate.getTime() + 60*60*24*1000);
        }
        for(var i = 0; i< this.x.length; i++){
            this.y.push(0);
        }
    }
}