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
const eventValues:{[clientid:string]:{eventVal:string}}={}


wss.on("connection",async(ws , req) => {

    console.log('running and connect with new client')
    const clientId = String(Math.round(Math.random()*1000))

    console.log("client id for "+ clientId)
     clientsID.push( clientId)
     Instance[clientId] = {ws}
     ws.send(JSON.stringify({ type:'clientId', content: clientId }));
     console.log("working till this line ")

     function updateValues(roomId: string,nature:string,newClientId: string) {
      
        if (!allRoomIds[roomId]) {
         if(nature==='create'){
            allRoomIds[roomId] = { value: 1, currentClientids: { one:newClientId } };
            eventValues[newClientId]={eventVal:'O'}
            const wsiEvent = Instance[newClientId].ws
            wsiEvent.send(JSON.stringify({type:'setEventValue',value:'O'}))
              //   return console.log("roomid added client id added in a object ",allRoomIds[roomId].value, allRoomIds[roomId].currentClientids.one)
              return true
         }else{
            return false
         }
        
        } 
        if (allRoomIds[roomId].value === 1) {
            if(nature === 'join'){
                allRoomIds[roomId].currentClientids.two = newClientId;
                allRoomIds[roomId].value = 2;
                eventValues[newClientId]={eventVal:'X'}
                const wsiEvent = Instance[newClientId].ws
                wsiEvent.send(JSON.stringify({type:'setEventValue',value:'X'}))
                // return console.log("allRoomids value updated to 2 and new clientid added", allRoomIds[roomId].value, allRoomIds[roomId].currentClientids)
                return true
              // Update the value to 2
            }else{
                return false
            }
        } else if (allRoomIds[roomId].value === 2) {

        //   return console.log("This room already has two members, so try to create a new room.");
        return false
        }
    
      }



     ws.on('message',(message) => {
        
        // console.log("client"+ message)
       console.log("working insider messsages")

       console.log("message after parsing"+ JSON.parse(message.toString()))
       
       const data = JSON.parse(message.toString())
        console.log('data type of the data coming to backend'+JSON.stringify(data))
     
        if(data.type === 'roomid'){

            // allRoomIds[data.roomid]={value:1, currentClientids:{one:clientId}}
            if( updateValues(data.roomid,data.nature,clientId)){
                ws.send(JSON.stringify({type:'roomid' , content:'done'}))
                console.log("room id recieved sucessfullyu and its done  ")
              
            }else{
                ws.send(JSON.stringify({type:'roomid' , content:'undone'}))
                console.log("room id already had two members so try to create new room ")
              
            }
        }else{
            ws.send(JSON.stringify({type:'roomid', content:'undone'}))
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
            console.log("event data coming to backend ")
            const clientRoomid= data.rid;
            const ownclientid = data.cid
            if(allRoomIds[clientRoomid]){
                if(allRoomIds[clientRoomid].value=== 2){
                    const one = allRoomIds[clientRoomid].currentClientids.one
                    const two = allRoomIds[clientRoomid].currentClientids.two
                    if(!(ownclientid === one)){
                        const wsroom =Instance[one]?.ws
                        if(wsroom){
                            wsroom.send(JSON.stringify({type:"event",value:data.value,position:data.position}))
                            if(two){
                                const wsroom2 = Instance[two]?.ws 
                                if(wsroom2){
                                    wsroom2.send(JSON.stringify({type:"event",value:data.value,position:data.position}))   
                                }
                            }
                           
                        }
                    }if(!(ownclientid === two)){
                        if(two){
                            const wsroom = Instance[two]?.ws
                            if(wsroom){
                                wsroom.send(JSON.stringify({type:"event",value:data.value,position:data.position}))
                                const wsroom2= Instance[one]?.ws
                                if(wsroom2){
                                    wsroom2.send(JSON.stringify({type:"event",value:data.value,position:data.position}))   
                                }
                            }
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
