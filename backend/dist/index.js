"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const store = [];
const clients = new Map();
wss.on("connection", (ws, req) => {
    console.log('running');
    const clientId = Math.round(Math.random() * 1000);
    console.log("client id for " + clientId);
    clients.set(clientId, ws);
    const key = req.headers['sec-websocket-key'];
    console.log("key value for clients" + key);
    ws.on('message', (message) => {
        ws.send(JSON.stringify({ type: 'clientId', content: clientId }));
        console.log("client" + message);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});