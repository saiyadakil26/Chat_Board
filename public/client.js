const socket=io();
let name
let msg=document.querySelector("#msg");
console.log(msg);
let marea=document.querySelector(".ms")
do {
    name=prompt("Enter Your Name : ")
} while (!name);

msg.addEventListener('keyup',(e)=>{
    if (e.key=='Enter') {
        sendmsg(e.target.value);     
    }
})

const sendmsg=(msge)=>{
    let msg={
        user :name,
        message :msge.trim()
    }
    appendmsg(msg,"outgoing-msg")
    document.querySelector("#msg").value=''
    toscrol()

    //send to server

    socket.emit('message',msg)

}

const appendmsg=(mg,ty)=>{
    let mdiv=document.createElement('div')
    let className=ty
    mdiv.classList.add(className)
    let markup=`  <p class="tm">${mg.user}</p>
    <p class="td">${mg.message}</p>`
    mdiv.innerHTML=markup
    marea.appendChild(mdiv)
}

//recieve message

socket.on('message',(msg)=>{
appendmsg(msg,'incoming-msg')
toscrol()
})

const toscrol=()=>{
    marea.scrollTop=marea.scrollHeight
}