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
     ws.send(JSON.stringify({ type:'clientId', content: clientId }));
     console.log("workinh till this line ")

     function updateValues(roomId: string,  newClientId: string) {
      
        if (!allRoomIds[roomId]) {
         
          allRoomIds[roomId] = { value: 1, currentClientids: { one:newClientId } };
          return console.log("roomid added client id added in a object ",allRoomIds[roomId].value, allRoomIds[roomId].currentClientids.one)
        } 
        if (allRoomIds[roomId].value === 1) {
    
            allRoomIds[roomId].currentClientids.two = newClientId;
            allRoomIds[roomId].value = 2;
            return console.log("allRoomids value updated to 2 and new clientid added", allRoomIds[roomId].value, allRoomIds[roomId].currentClientids)
          // Update the value to 2
          
        } else if (allRoomIds[roomId].value === 2) {
          return console.log("This room already has two members, so try to create a new room.");
        }
    
      }



     ws.on('message',(message) => {
        
        // console.log("client"+ message)
       console.log("working insider messsages")

       console.log("message after parsing"+ JSON.parse(message.toString()))
       
       const data = JSON.parse(message.toString())
        console.log('data type of the data coming to backend'+data.type ,data.roomid)
     
        if(data.type === 'roomid'){
            // allRoomIds[data.roomid]={value:1, currentClientids:{one:clientId}}
            updateValues(data.roomid,clientId)
         ws.send(JSON.stringify({type:'roomid' , content:data.roomid}))
         console.log("room id recieved sucessfullyu and its done  ")
       
        }else{
            ws.send(JSON.stringify({type:'roomid', content:null}))
            console.log("not getting type roomid from the client ")
        }
        console.log(' message response from the client'+JSON.stringify(data))
        if(data.type === 'message' ){
            const clientRoomid= data.rid;
            console.log("type message working")
            const ownclientid = data.cid
            if(allRoomIds[clientRoomid]){
                if(allRoomIds[clientRoomid].value=== 2){
                    const one = allRoomIds[clientRoomid].currentClientids.one
                    const two = allRoomIds[clientRoomid].currentClientids.two
                    if(!(ownclientid === one)){
                        const wsroom =Instance[one]?.ws
                        if(wsroom){
                            wsroom.send(JSON.stringify({type:"message",content:data.content}))
                             console.log("message is going to first client and its wwwwwwwwwwwwwwwwwooooooooooooooorrrrrrrrrrkkkkkiiiiiiiiiinnnnnnnnnnnnnhhhhhhhhh")
                        }
                    }if(!(ownclientid === two)){
                        if(two){
                            const wsroom =Instance[two]?.ws
                            if(wsroom){
                                wsroom.send(JSON.stringify({type:"message",content:data.content}))
                                 console.log("message is going to second  client and its wwwwwwwwwwwwwwwwwooooooooooooooorrrrrrrrrrkkkkkiiiiiiiiiinnnnnnnnnnnnnhhhhhhhhh")
                            }
                        }
                       
                    }
                }
            }
        }
        if(data.type === 'event'){
            const clientRoomid= data.rid;
            const ownclientid = data.cid
            if(allRoomIds[clientRoomid]){
                if(allRoomIds[clientRoomid].value=== 2){
                    const one = allRoomIds[clientRoomid].currentClientids.one
                    const two = allRoomIds[clientRoomid].currentClientids.two
                    if(!(ownclientid === one)){
                        const wsroom =Instance[one]?.ws
                        if(wsroom){
                            wsroom.send(JSON.stringify({type:"event",content:data.content}))
                        }
                    }
                }
            }
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
