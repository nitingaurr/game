import { Table } from "./components/table"
import { useEffect, useState } from "react"

function App() {


 const [ val, setVal ] = useState<{type:string ,cid:string | null , content:string}  | "">("")
 const [wsi,setWsi] = useState< WebSocket | null>(null)
 const [data, setData] = useState< {type:string, content:string} | null>(null)
 const [clientId, setClientId] = useState<string | null>(null) 
 const [clientSelectedValue , setClientSelectedValue] = useState<string | null>(null)
 
 useEffect(() => {
  const ws = new WebSocket(
    "ws://localhost:8080"
   )
    setWsi(ws)

},[])

wsi?.addEventListener('message', async (event) => {
  const d = await event.data
  const da = JSON.parse(d)
  if(da.type === "clientId"){
    setClientId(da.content)
  }
  setData(da)
} )


console.log(`data recieved from server ${data?.content}`)


  return (
    <>
    <div className="">

      your message 
      <input type="text"
      onChange={(e) => {
      setVal({
        type:"message",
        cid:clientId,
        content:e.target.value
      })
      }}
       className=" m-4 border border-lg "/>
      <button onClick={() => {
        console.log('sending')
         wsi?.send(JSON.stringify(val))

      }} >send</button>
    <p className="  mt-5 text-center text-4xl text-amber-500">
      tic-tac game
    </p>
     { data?.type ===  "clientId"&& <p> client id {clientId} </p>  }
     { data?.type ===  "message"  && <p> server msg {data?.content} </p>  }
    <div>
    
      <Table wsi={wsi}/>
    </div>
    <div className="group w-10 h-10 bg-gray-300 relative overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    O
  </div>
</div>

    </div>

    </>
  )
}

export default App
