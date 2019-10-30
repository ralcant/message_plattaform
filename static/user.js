// import {validate} from './helpers'


document.addEventListener('DOMContentLoaded', ()=>{
    console.log('user.js ran!')
    var socket = io.connect(location.protocol+'//'+ document.domain + ':'+ location.port);
    socket.on('connect', ()=>{
        let display_name = localStorage.getItem("display_name");
        // document.querySelector("#create_channel").onsubmit = () => false;
        document.querySelector("#create_channel").addEventListener("submit", ()=>{  
            // console.log(document.querySelector("#create_channel")).cancelable;
            let channel_name = document.querySelector("#channel_name").value;
            console.log(typeof channel_name )
            if (validate(channel_name)){
                console.log(`Trying to create the channel ${channel_name}...`)
                socket.emit("new_channel", {"channel_name": channel_name, "channel_creator": display_name})
            }
            else{
                console.log("invalid message!")
            }
            // document.querySelector("#channel_name").value ="" //restarting the input field

            return false
        });
    });
    socket.on("channels", (data)=>{
        let channel = data["new_channel"];
        
        let channel_name = channel[0];
        let channel_creator = channel[1];
        console.log(`On "channels" for the channel_name ${channel_name} and channel_creator ${channel_creator}`)

        let new_channel= channel_generator(channel_name, channel_creator);
        document.querySelector("#channels_parent").appendChild(new_channel);
        let first_comment = document.querySelector("#first_comment")
        if (first_comment){
            first_comment.parentNode.removeChild(first_comment) //remove the first comment!
        }
        return false;
    })
})

function channel_generator(channel_name, channel_creator){
    //TODO: Make it fancier
    let result= document.createElement('a')
    result.setAttribute('class', "single_channel")
    // n.onclick= ()=>{
    //     handle_channel_click(channel_name)
    // }
    result.setAttribute('href', Flask.url_for('channel', {"channel_name":channel_name}))

    // result.setAttribute('onmousedown', handle_channel_click(channel_name))
    console.log("channel_generatos with channel_name =", channel_name)
    // let link_redirect= `/channel/`
    // let link_redirect = Flask.url_for('channel', {"channel_name": channel_name})
    // console.log("link_redirect=", link_redirect)
    result.innerHTML= `
                        <p>${channel_name}, created by ${channel_creator}</p>
                        `
    // result.innerHTML= `
    //                     <a href="${link_redirect}">${channel_name}</a>, created by ${channel_creator} 
    //                 `
    return result

    // let new_channel = document.createElement('li');
    // let link = document.createElement('a')
    // link.setAttribute('href', Flask.url_for('channel', {channel_name: channel_name}))
    // let inner_span = document.createElement('span')
    // inner_span.innerText = `${channel_name}`
    // link.appendChild(inner_span) 

    // let outer_span = document.createElement('span')
    // outer_span.innerText= `, created by ${channel_creator}`
    // new_channel.appendChild(link)// `${link}, created by ${channel_creator}`; 
    // new_channel.appendChild(outer_span)
    // console.log(`new_channel is ${new_channel}`)
    // console.log(`channel_name is ${channel_name}`)

    // return new_channel
    
}

function handle_channel_click(channel_name){
    console.log("got here", channel_name)
    // console.log(Flask.url_for('channel', channel_name=channel_name))

    // window.location.replace(`/channel/${channel_name}`
    window.location.replace(Flask.url_for('channel', {"channel_name":channel_name}))
}


//TODO: IMPORT/EXPORT CORRECTLY

function validate(msg){
    //validates a not-empty input name
    return (!msg.startsWith(" ") && msg.length !== 0)
}


// function date_format(date){
//     let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     let hours = date.getHours() //0-11
//     let minutes = date.getMinutes() // 0-59
//     let day= date.getDate() // (1-31)
//     let month = months[date.getMonth()] //one from months

//     return `${month} ${day} at ${hours}:${minutes}`
// }