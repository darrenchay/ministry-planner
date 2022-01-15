export const convertDate = (unix_timestamp) => {
    var a = new Date(unix_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var timeOfDay = hour + ":" + min;
    // var time = date + ' ' + month + ' ' + year;
    var time = {
        date: date,
        month: month,
        year: year
    }
    return time;
}

export const formatDate = (timestamp) => {
    // Convert unix timestamp to "d MMM yyyy - HH:mm" format
    var a = new Date(timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours()
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    var ampm = hour >= 12 ? 'PM' : 'AM';
    var min = a.getMinutes();
    min = min < 10 ? '0'+min : min;
    var time = date + ' ' + month + ' ' + year + ' - ' + hour + ':' + min + ' ' + ampm;
    return time;
  }

  export const getDay = (timestamp) => {
    var a = new Date(timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year
    return time;
  }