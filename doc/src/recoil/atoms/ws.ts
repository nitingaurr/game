import { atom } from "recoil";

export const WsInstance = atom({
    key:"wsiInstance",
    default: WebSocket
})