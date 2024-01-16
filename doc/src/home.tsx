import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { WsInstance } from "./recoil/atoms/ws"
import { useNavigate } from "react-router-dom"


export function Home () {

    const navigate = useNavigate()
    const [ val , setVal ] = useState(1)
    const setWsi = useSetRecoilState<WebSocket | null>(WsInstance)
    const [roomid , setRoomid] = useState<string | null>(null)

    return(
        <>
        <div className=" mt-10">
           <p className=" text-7xl text-slate-500 text-font-thin text-center">
            Tic-Tac-Toe 
            </p> 
        </div>
        <div className=" mt-10 flex items-center justify-center">
        <div className="  h-[75vh] w-[100vh] rounded-lg ">
            <div className=" m-3 flex justify-around">
        <div>
            <button
            onClick={() => {
                setVal(1)
            }}
            className =  {`text-3xl rounded-xl border px-7 py-2  text-gray-500 ${ val ===1 ? 'bg-slate-200':""}`}
            >
                Create a room 
            </button>

        </div>
        <div>
            <button 
            onClick={() => {
                setVal(2)
            }}
            className={ `text-3xl rounded-xl border px-7 py-2  text-gray-500  ${ val === 2 ? 'bg-slate-200' : ''}`}>
            Join a room 
            </button>
        </div>
        </div>
        <div className="space-y-2 font-medium border-t border-gray-900"></div>
        { val === 1 && <> <div className="flex mt-10 justify-center ">
        <input 
        onChange={(e) => {
            setRoomid(e.target.value)
            console.log("vlaue and type of roomid " + roomid , typeof roomid)
        }}
        type="text"
        placeholder="type here..."
        className="py-2 px-3 rounded-lg border border-gray-900"  />
       </div>
       <div className="flex mt-5 justify-center">
        <button 
        onClick={() => {
            const ws = new WebSocket(
                "ws://localhost:8080"
               )
               console.log('clicked button')
                ws.addEventListener('message',async (event) => {
                   const data = await JSON.parse(event.data)
                   console.log("vlue of data coming to backend "+ data.type , data.content)
                   console.log("getting data with value " + data.type)
                   if(data.type === 'clientId'){
                    ws.send(JSON.stringify({type:"roomid",roomid:roomid }))
                    console.log("we recieved client id and sending room id ")
                    ws.addEventListener('message',async(event) => {
                        const dataRoomid = await JSON.parse(event.data)
                        console.log("room id sucessfull message received "+ dataRoomid.type , dataRoomid.content)
                       if(dataRoomid.content === "done"){
                        try {
                            console.log("navigation and reciol is not working")
                            setWsi(ws)
                            navigate("/play")
                        } catch (error) {
                            console.log('error in navigation'+error) 
                        }
                       
                       }
                    
                    })
                    
                   }else{
                    console.log('data type is not working and and you dont get data with clietn id ')
                   }
               })

              
        } }
        className=" text-xl rounded-xl border px-7 py-2 text-gray-700 hover:bg-slate-200 active:bg-slate-300">
            Create
        </button>
       </div>
       </>}
       { val === 2 && <> <div className="flex mt-10 justify-center ">
        <input 
        type="text"
        placeholder="type here..."
        className="py-2 px-3 rounded-lg border border-gray-900"  />
       </div>
       <div className="flex mt-5 justify-center">
        <button className=" text-xl rounded-xl border px-7 py-2 text-gray-700 hover:bg-slate-200 active:bg-slate-300">
            Join
        </button>
       </div>
       </>}
        </div>
        </div>
        </>
    )
}