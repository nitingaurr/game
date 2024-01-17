"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const clientsID = [];
const allRoomIds = {};
const Instance = {};
wss.on("connection", (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('running and connect with new client');
    const clientId = String(Math.round(Math.random() * 1000));
    console.log("client id for " + clientId);
    clientsID.push(clientId);
    Instance[clientId] = { ws };
    ws.send(JSON.stringify({ type: 'clientId', content: clientId }));
    console.log("workinh till this line ");
    function updateValues(roomId, newClientId) {
        if (!allRoomIds[roomId]) {
            allRoomIds[roomId] = { value: 1, currentClientids: { one: newClientId } };
            return console.log("roomid added client id added in a object ", allRoomIds[roomId].value, allRoomIds[roomId].currentClientids.one);
        }
        if (allRoomIds[roomId].value === 1) {
            allRoomIds[roomId].currentClientids.two = newClientId;
            allRoomIds[roomId].value = 2;
            return console.log("allRoomids value updated to 2 and new clientid added", allRoomIds[roomId].value, allRoomIds[roomId].currentClientids);
            // Update the value to 2
        }
        else if (allRoomIds[roomId].value === 2) {
            return console.log("This room already has two members, so try to create a new room.");
        }
    }
    ws.on('message', (message) => {
        // console.log("client"+ message)
        console.log("working insider messsages");
        console.log("message after parsing" + JSON.parse(message.toString()));
        const data = JSON.parse(message.toString());
        console.log('data type of the data coming to backend' + data.type, data.roomid);
        if (data.type === 'roomid') {
            // allRoomIds[data.roomid]={value:1, currentClientids:{one:clientId}}
            updateValues(data.roomid, clientId);
            ws.send(JSON.stringify({ type: 'roomid', content: "done" }));
            console.log("room id recieved sucessfullyu and its done  ");
        }
        else {
            ws.send(JSON.stringify({ type: 'roomid', content: "error" }));
            console.log("not getting type roomid from the client ");
        }
        if (data.type === 'message' || data.type === 'event') {
            const clientRoomid = data.roomid;
            const ownclientid = data.clientId;
            updateValues(clientRoomid, ownclientid);
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
    });
    console.log("working outside messages");
    ws.on('close', () => {
        console.log('Client disconnected');
    });
}));
