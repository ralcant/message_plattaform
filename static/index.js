document.addEventListener('DOMContentLoaded', function(){
    if (localStorage.getItem('display_name') === null){
        //If the "display_name" does not exist, show a form to do it

        console.log("display_name doesn't exist here yet!")
        console.log("page loaded!")
        var socket = io.connect(location.protocol+'//'+ document.domain + ':'+ location.port);
    
        socket.on('connect', ()=>{
            console.log("socket succesfully connected :D")
            console.log("Now configuring buttons...")
    
            // const display_form= document.querySelector("#display_form");
            document.querySelector("#display_form").onsubmit= ()=>{
                console.log(document.querySelector("#display_form"));
                // console.log(test);
                let new_name = document.querySelector("#name")
                console.log(`new_name is ${new_name}`)
    
                // let test = document.querySelector("#submit").value
                localStorage.setItem('display_name', new_name.value)
                return true
            }
        })
    } else{
        if (localStorage.getItem('last_channel_visited')){
            //remembering the last channel visited
            console.log("Returning to last channel visited...")
            let last_channel = localStorage.getItem('last_channel_visited');
            window.location.replace(`/channel/${last_channel}`)
        } else{
         //"log in" the user if they already have a set display_name
         console.log("display_name exist here! and still haven't visited any previous channels!")
         let display_name = localStorage.getItem("display_name")
         window.location.replace(`/user/${display_name}`) //changes the location (url) of the bottom
        }
    }
});




        // const create_channel = 
        // document.querySelector("#create_channel").onsubmit = ()=>{
        //     let new_channel = document.querySelector("#channel_name").value;
        //     console.log(`Trying to create the channel ${new_channel}...`)
        //     socket.emit("new_channel", {"new_channel": new_channel})
        //     return false
        // }
        // display_form.onsubmit = ()=>{
        //     let display_name = document.querySelector("#name").value

        //     if (display_name.length !== 0){
        //         console.log(display_name)
        //     }
        //     // socket.emit("send_message", {display_name: display_name})
        //     // return redirect(url_for('/user', display_name= display_name))
        //     // return false
        // }
        // display_form.action= url_for('user', display_name= display_name)
        // ()=>{
        //     return "url_for('user', display_name= display_name)"
        // };
    // })

    // socket.on("channels", (data)=>{
    //     // let channels_parent= document.getElementById("channels_parent")
    //     console.log("socket is on channels!")
    //     let new_channel= document.createElement('li')
    //     new_channel.innerHTML= data["new_channel"]
    //     document.getElementById("channels_parent").append(new_channel)
    // })
// });
// socket.on("total_messages")


// window.addEventListener('DOMContentLoaded', (event) => {
//     console.log('DOM fully loaded and parsed');
// });