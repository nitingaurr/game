import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port:8080})

type RoomData = {
    value: number;
    currentClientids: {
      one: string ;
      two ?: string 
    };
  };



const clientsID:string[]= []
const allRoomIds :{[roomid:string]:RoomData} ={}
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
            allRoomIds[data.roomid]={value:1, currentClientids:{one:clientId}}
         ws.send(JSON.stringify({type:'roomid' , content:"done"}))
         console.log("room id recieved sucessfullyu and its done  ")
       
        }else{
            ws.send(JSON.stringify({type:'roomid', content:"error"}))
            console.log("not getting type roomid from the client ")
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

//so first when ws connection is created between client and server so  a client id is created for that client 
//  and send the clientid to the client and now save the client in the server and saving this client ws instance and 
// with the clientid key and when this client create or join room so first the client send the a room id for which we want
// to create or join we store we extract the roomid and check with our array that store all roomis and we checks is this room id 
// is exist or not if its the req to join and we find that room id then we assing the same roomid to this client and then they both 
// they both the client with their client id are with this room id 