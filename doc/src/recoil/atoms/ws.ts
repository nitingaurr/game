import { atom } from "recoil";

function defaultProfile () {
    const value = localStorage.getItem('wsInstance')
    if(value){
        if(JSON.parse(value)){
            return JSON.parse(value)
        }else{
            return value
        }
    }
}

function persist ({setSelf,onSet}) {
    onSet((value) => {
        if(value){
            localStorage.setItem('phover',JSON.stringify(value))
        }
    })
}

export const WsInstance = atom({
    key:"wsiInstance",
    default:defaultProfile(),
    effects:[
        persist
    ]
})
