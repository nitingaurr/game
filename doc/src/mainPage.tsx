

import { useRecoilValue } from "recoil"
import { Table } from "./components/table"
import { useState } from "react"
import { WsInstance } from "./recoil/atoms/ws"
import { Roomid } from "./recoil/atoms/roomid"
import { recoilClientid } from "./recoil/atoms/clientid"

export  function Play () {
    const [ val, setVal ] = useState("")
    const wsi = useRecoilValue(WsInstance)
     const roomid = useRecoilValue(Roomid)
    const clientid = useRecoilValue(recoilClientid)
    const [data, setData] = useState< {type:string, content:string} | null>(null)
    const [clientSelectedValue , setClientSelectedValue] = useState<string | null>(null)
    
    
   
   wsi?.addEventListener('message', async (event: { data: any }) => {
     const d = await event.data
     const da = JSON.parse(d)
     if(da.type === "message"){
       setData(da)
       console.log("server sending messages to us from another client",da)
     }if(da.type === 'event'){
      setClientSelectedValue(da.content)
      console.log("server sending event to us from another client",da)
     }
     
   } )
   
   
   console.log(`data recieved from server ${data?.content}`)

   console.log("hahahhahahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",roomid , clientid)
   
   
     return (
       <>
       <div className="">
       <p className="  mt-5 text-center text-4xl text-slate-500">
         tic-tac game
       </p>
      
       <div className="flex items-center justify-center">
       
         <Table />
       </div>
       </div>
       <div className=" mt-7 flex  justify-center">
        <div>
         <p className=" text-center text-3xl text-gray-500 ">chat with your friend </p>
         <div className=" mt-5 relative flex">
         <input
         placeholder="type here..."
         type="text"
         value={val}
         onChange={(e) => {
         setVal(
          e.target.value
         )
         }}
          className=" rounded-xl py-3 pl-5 pr-16 w-[70vh] border shadow-md hover:shadow-xl transition-shadow duration-300 focus:outline-none"></input>
         <button onClick={() => {
           console.log(' chat message sending')
           if (wsi && wsi.readyState === WebSocket.OPEN) {
            wsi.send(JSON.stringify({
              type: "message",
              cid: clientid,
              rid: roomid,
              content: val
            }));
            setVal('')
          } else {
            console.error('WebSocket connection is not open.');
          }
         }} 
         className="ml-5 absolute inset-y-0 right-0 px-4 m-1.5 ml-1 mr-1 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300"
         ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
       </svg>
       
       </button>
         </div>
        </div>
        </div>
        <div className="  mt-4"><p className="text-center  text-4xl text-slate-700">Message: <span className="text-2xl text-slate-400 text-center">{data?.content}</span></p></div>
       </>
     )
}