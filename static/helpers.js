function validate(msg){
    //validates a not-empty input name
    return (!msg.startsWith(" ") && !msg.length ===0)
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function date_format(date){
    let hours = date.gethours() //0-11
    let minutes = date.getMinutes() // 0-59
    let day= date.getDate() // (1-31)
    let month = months[date.getMonth()] //one from months

    return `${month} ${day} at ${hours}:${minutes}`
}

export {validate, date_format};