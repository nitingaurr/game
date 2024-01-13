import { WebSocketServer, WebSocket } from "ws";
import { Express } from "express";

const  ws2s = new WebSocket.Server({port:3000})
const wss = new WebSocketServer({port:8080})

const  msg = 'dont panic and be focus thats what differntiate you with other'

wss.on("connection",(ws) => {
    console.log('running')

    ws.on('message',(message) => {
        console.log("message recieved from client"+ message)

        ws.send(`msg send to the client ${msg}`)
    })

    ws.on('close', () => {
        console.log('Client disconnected');
      });
})

