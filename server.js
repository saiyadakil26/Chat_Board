const exp=require('express');
const { Socket } = require('socket.io');
const app=exp()
const http=require('http').createServer(app);
const Port=process.env.Port || 3000;

http.listen(Port,()=>{
    console.log(`Server Start on Port ${Port}`)
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
}) 

app.use(exp.static(__dirname+'/public'))

//socket.io

io=require('socket.io')(http)

io.on('connection',(socket)=>{
    // console.log("connected")
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})