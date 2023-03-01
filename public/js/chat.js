const socket = io()


    socket.on('message',(msg) => {
        console.log("from server",msg)
    })

    document.getElementById('sendbtn').addEventListener('click',() => {
        let msg = document.getElementById('inputbox').value;
        console.log(msg);
        socket.emit('sendmsg',msg,(message) => {
            console.log("The message was delivered!",message);
        });
    })

    document.querySelector('#send-loacation').addEventListener('click',() => {
        if(!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }
        navigator.geolocation.getCurrentPosition((postion) => {
            console.log(postion);
            socket.emit('sendLocation',{
                latitude : postion.coords.latitude,
                longitude : postion.coords.longitude
            })
        })
    })