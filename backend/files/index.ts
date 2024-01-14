import { WebSocketServer, WebSocket } from "ws";
import { Express } from "express";


const wss = new WebSocketServer({port:8080})

type C = {
    clientId:string,
    ws:WebSocketServer
}




const clientsID:string[]= []

const Instance:{[clientId:string]:{ws:any}} ={}

wss.on("connection",(ws , req) => {
  
    console.log('running')
    
    const clientId = String(Math.round(Math.random()*1000))
  
    console.log("client id for "+ clientId)
     clientsID.push( clientId)
     Instance[clientId] = {ws}
     ws.send(JSON.stringify({ type: 'clientId', content: clientId }));
    ws.on('message',(message) => {
        
        console.log("client"+ message)
        console.log("message after parsing"+ JSON.parse(message.toString()))
        const { cid, content} = JSON.parse(message.toString()) 
        console.log('value of client id with message'+cid , content)
        const otherClientId = clientsID.filter((id) => id !== cid
        )[0]
        console.log("value of array stored all client id"+clientsID)
        console.log("value of other clients id getting using filter"+otherClientId)
    }
      
    )

    ws.on('close', () => {
        console.log('Client disconnected');
      });

      
})

