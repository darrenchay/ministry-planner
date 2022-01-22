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

export const formatDateTitle = (timestamp) => {
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

export const formatDateComment = (timestamp) => {
    const date = new Date(timestamp*1000);  // +43200 is to change to mauritian time
    var daysInterval = Math.floor((new Date() - date - 43200) / 1000) / 86400;

    if (daysInterval > 7) {
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    }

    var hour = date.getHours()
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    var ampm = hour >= 12 ? 'pm' : 'am';
    var min = date.getMinutes();
    min = min < 10 ? '0'+min : min;
    var time = hour + ':' + min + ' ' + ampm

    if (daysInterval > 1) {
        var weekday = date.toLocaleDateString("en-US", { weekday: 'short' })
        return  weekday + ' ' + time
    }
    return "Today " + time;
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
