// import { load_image } from "./images";

// import {validate, date_format} from './helpers.js'

document.addEventListener('DOMContentLoaded', () =>{
    var socket = io.connect(location.protocol+'//'+ document.domain + ':'+ location.port);
    
    message_class_divider(); //we need to make sure to differentiate
                            //when you send a message vs when other person sends a message
    let scroll_bar= document.querySelector("#total_messages").scrollHeight;
    document.querySelector("#total_messages").scrollTop= scroll_bar; //so that you see the last message everytime you refresh the page. See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
    // setting_profile_pic();

    document.querySelector("#message").onsubmit = ()=>{
        let message_content = document.querySelector("#new_message").value
        if (validate(message_content)){
            let message_sender = localStorage.getItem('display_name')
            let channel_name = document.querySelector("#channel_header").dataset.name
            let time_now = new Date()

            let time_sent = date_format(time_now)
            let data = {
                "channel_name": channel_name,
                "message_content": message_content,
                "message_sender": message_sender,
                "time_sent": time_sent,
            }
            console.log(`data about to be setn ${data}`)
            socket.emit("new_message", data)
        }
        document.querySelector("#new_message").value = ""; //restarting input value
        return false
    }


    socket.on('messages', (data) =>{
        //appendChild to the div in channel.html

        let {channel_name} = data;
        let current_channel_name =  document.querySelector("#channel_header").dataset.name
        console.log(channel_name, current_channel_name)
        if (channel_name === current_channel_name){ //only update the DOM if you are in the same channel!
            let new_message = message_generator(data); 
            document.querySelector("#total_messages").appendChild(new_message)  
            document.querySelector("#total_messages").scrollTop= new_message.offsetHeight+ new_message.offsetTop;

            //deleting the first message if necessary
            let first_message = document.querySelector("#no_messages")
            if (first_message){
                first_message.parentNode.removeChild(first_message)
            }
        }

    })

    // let create_channel_modal = document.querySelector("#create_channel_modal")
    // let create_channel_button= document.querySelector("#create_channel_button")
    // let close_button = document.querySelector("#close_button")
    // create_channel_button.onclick= ()=>{
    //     document.body.style.opacity=0.1;
    //     create_channel_modal.style.display= "flex";
    // }
    // close_button.onclick = ()=>{
    //     document.body.style.opacity=1;
    //     create_channel_modal.style.display="none";
    // }

});

window.addEventListener("beforeunload", ()=>{
    let current_channel_name =  document.querySelector("#channel_header").dataset.name
    // if (!localStorage.getItem('last_channel_visited')){
    //     localStorage.setItem('last_channel_visited', current_channel_name)
    // }
    console.log("remembering the channel...")
    localStorage.setItem('last_channel_visited', current_channel_name)    
})
// window.onbeforeunload = function() {
//     return false;
// }

function message_generator(data){
    let {message_content, message_sender, time_sent} = data;

    let result2 = document.createElement('div')
    let message_class = localStorage.getItem('display_name') === message_sender ? "own_message": "external_message"
    result2.innerHTML = `
                        <div class= "${message_class} single_message_container">
                            <span data-sender=${message_sender} class="message_text">${message_content}</span>
                            <span class="extra_message_info">Sent by ${message_sender}. Time sent: ${time_sent}</span> 
                        </div>
                        `;
    let single_children = Array.from(result2.children); //only one element
    return single_children[0]
    // let result = document.createElement('span')
    // result.innerText = `${message_content}, sent by ${message_sender}. Time sent: ${time_sent}`

    // let space = document.createElement('br')

    // let first_message = document.querySelector("#no_messages")
    // if (first_message){
    //     first_message.parentNode.removeChild(first_message)
    // }
    // result.setAttribute("class", "own_message")
    // if (message_sender === localStorage.getItem('display_name')){
    //     result.setAttribute("class", "own_message")
    // } else{
    //     result.setAttribute("class", "external_message")
    // }
    // result.appendChild(space)
    // return result
}
function message_class_divider(){
    //select all children
    let messages_array = Array.from(document.querySelector("#total_messages").children)
    
    for (message of messages_array){
        if (message.dataset.info !== "no_messages"){
            if (message.dataset.sender === localStorage.getItem('display_name')){
                message.setAttribute('class', "own_message single_message_container")
            } else{
                message.setAttribute('class', "external_message single_message_container")
            }
        }
    }

}

function setting_profile_pic(){
    let profile = document.querySelector("#profile_picture")
    let display_name = localStorage.getItem('display_name')
    let img_src = load_image(display_name)
    profile.src= img_src
}








// function validate(msg){
//     //validates a not-empty input name
//     return (!msg.startsWith(" ") && !msg.length ===0)
// }


function date_format(date){
    console.log(date)
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let hours = date.getHours() //0-11
    let minutes = date.getMinutes() // 0-59
    let day= date.getDate() // (1-31)
    let month = months[date.getMonth()] //one from months
    console.log(month, day, hours, minutes)

    return `${month} ${day} at ${hours}:${minutes}`
}