import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port:8080})
type C = {
    clientId:string,
    ws:WebSocketServer
}

const clientsID:string[]= []
const Instance:{[clientId:string]:{ws:any}} ={}

wss.on("connection",async(ws , req) => {

    console.log('running and connect with new client')
    const clientId = String(Math.round(Math.random()*1000))

    console.log("client id for "+ clientId)
     clientsID.push( clientId)
     Instance[clientId] = {ws}
     ws.send(JSON.stringify({ type: 'clientId', content: clientId }));
     console.log("workinh till this line ")

     ws.on('message',(message) => {
        
        // console.log("client"+ message)
       console.log("working insider messsages")

       console.log("message after parsing"+ JSON.parse(message.toString()))
       
       const data = JSON.parse(message.toString())
        console.log('data type of the data coming to backend'+data.type ,data.roomid)
        if(data.type === 'roomid'){
         ws.send(JSON.stringify({type:'roomid' , content:"done"}))
         console.log("room id recieved sucessfullyu and its done  ")
       
        }
        // const { cid, content} = JSON.parse(message.toString()) 
        // console.log('value of client id with message'+cid , content)
        // const otherClientId = clientsID.filter((id) => id !== cid
        // )
        // console.log("value of array stored all client id"+clientsID)
        // console.log("value of other clients id getting using filter"+otherClientId)
        // console.log("value of instance "+Instance[cid] , typeof cid)
        // Instance[cid].ws.send(JSON.stringify({type:"message", content:content}))
        // for(let i=0 ; i < otherClientId.length ;i++){
        //     console.log("loop is working")
        //     const id = otherClientId[i]
        //     console.log('value of id'+id , typeof id)
        //     const ws = Instance[id]?.ws 
        //     if(ws){
        //         ws.send(JSON.stringify({type:"message", content:content}))
        //     }else{
        //         console.log("ws is not defined")
        //     }        
        // } 
    }
    )
    console.log("working outside messages")
    ws.on('close', () => {
        console.log('Client disconnected');
      });

      
})

