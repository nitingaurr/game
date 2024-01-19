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
const eventValues = {};
wss.on("connection", (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('running and connect with new client');
    const clientId = String(Math.round(Math.random() * 1000));
    console.log("client id for " + clientId);
    clientsID.push(clientId);
    Instance[clientId] = { ws };
    ws.send(JSON.stringify({ type: 'clientId', content: clientId }));
    console.log("working till this line ");
    function updateValues(roomId, newClientId) {
        if (!allRoomIds[roomId]) {
            allRoomIds[roomId] = { value: 1, currentClientids: { one: newClientId } };
            eventValues[newClientId] = { eventVal: 'O' };
            const wsiEvent = Instance[newClientId].ws;
            wsiEvent.send(JSON.stringify({ type: 'setEventValue', value: 'O' }));
            //   return console.log("roomid added client id added in a object ",allRoomIds[roomId].value, allRoomIds[roomId].currentClientids.one)
            return true;
        }
        if (allRoomIds[roomId].value === 1) {
            allRoomIds[roomId].currentClientids.two = newClientId;
            allRoomIds[roomId].value = 2;
            eventValues[newClientId] = { eventVal: 'X' };
            const wsiEvent = Instance[newClientId].ws;
            wsiEvent.send(JSON.stringify({ type: 'setEventValue', value: 'X' }));
            // return console.log("allRoomids value updated to 2 and new clientid added", allRoomIds[roomId].value, allRoomIds[roomId].currentClientids)
            return true;
            // Update the value to 2
        }
        else if (allRoomIds[roomId].value === 2) {
            //   return console.log("This room already has two members, so try to create a new room.");
            return false;
        }
    }
    ws.on('message', (message) => {
        var _a, _b, _c, _d;
        // console.log("client"+ message)
        console.log("working insider messsages");
        console.log("message after parsing" + JSON.parse(message.toString()));
        const data = JSON.parse(message.toString());
        console.log('data type of the data coming to backend' + data.type, data.roomid);
        if (data.type === 'roomid') {
            // allRoomIds[data.roomid]={value:1, currentClientids:{one:clientId}}
            if (updateValues(data.roomid, clientId)) {
                ws.send(JSON.stringify({ type: 'roomid', content: 'done' }));
                console.log("room id recieved sucessfullyu and its done  ");
            }
            else {
                ws.send(JSON.stringify({ type: 'roomid', content: 'undone' }));
                console.log("room id already had two members so try to create new room ");
            }
        }
        else {
            ws.send(JSON.stringify({ type: 'roomid', content: 'undone' }));
            console.log("not getting type roomid from the client ");
        }
        console.log(' message response from the client' + JSON.stringify(data));
        if (data.type === 'message') {
            const clientRoomid = data.rid;
            console.log("type message working");
            const ownclientid = data.cid;
            if (allRoomIds[clientRoomid]) {
                if (allRoomIds[clientRoomid].value === 2) {
                    const one = allRoomIds[clientRoomid].currentClientids.one;
                    const two = allRoomIds[clientRoomid].currentClientids.two;
                    if (!(ownclientid === one)) {
                        const wsroom = (_a = Instance[one]) === null || _a === void 0 ? void 0 : _a.ws;
                        if (wsroom) {
                            wsroom.send(JSON.stringify({ type: "message", content: data.content }));
                            console.log("message is going to first client and its wwwwwwwwwwwwwwwwwooooooooooooooorrrrrrrrrrkkkkkiiiiiiiiiinnnnnnnnnnnnnhhhhhhhhh");
                        }
                    }
                    if (!(ownclientid === two)) {
                        if (two) {
                            const wsroom = (_b = Instance[two]) === null || _b === void 0 ? void 0 : _b.ws;
                            if (wsroom) {
                                wsroom.send(JSON.stringify({ type: "message", content: data.content }));
                                console.log("message is going to second  client and its wwwwwwwwwwwwwwwwwooooooooooooooorrrrrrrrrrkkkkkiiiiiiiiiinnnnnnnnnnnnnhhhhhhhhh");
                            }
                        }
                    }
                }
            }
        }
        if (data.type === 'event') {
            const clientRoomid = data.rid;
            const ownclientid = data.cid;
            if (allRoomIds[clientRoomid]) {
                if (allRoomIds[clientRoomid].value === 2) {
                    const one = allRoomIds[clientRoomid].currentClientids.one;
                    const two = allRoomIds[clientRoomid].currentClientids.two;
                    if (!(ownclientid === one)) {
                        const wsroom = (_c = Instance[one]) === null || _c === void 0 ? void 0 : _c.ws;
                        if (wsroom) {
                            wsroom.send(JSON.stringify({ type: "event", content: data.content }));
                        }
                    }
                    if (!(ownclientid === two)) {
                        if (two) {
                            const wsroom = (_d = Instance[two]) === null || _d === void 0 ? void 0 : _d.ws;
                            if (wsroom) {
                                wsroom.send(JSON.stringify({ type: "event", content: data.content }));
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
    });
    console.log("working outside messages");
    ws.on('close', () => {
        console.log('Client disconnected');
    });
}));
