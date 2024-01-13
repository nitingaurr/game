import { Table } from "./components/table"
import { useEffect, useState } from "react"

function App() {


 const [ val, setVal ] = useState<{type:string ,cid:string | null , content:string}  | "">("")
 const [wsi,setWsi] = useState< WebSocket | null>(null)
 const [data, setData] = useState< {type:string, content:string} | null>(null)
 const [clientId, setClientId] = useState<string | null>(null) 
 
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
    {/* <p className="  mt-5 text-center text-4xl text-amber-500">
      tic-tac game
    </p> */}
     { data?.type === "message" && <p> client id {clientId} </p>  }
     { data?.type === "clientId" && <p> server msg {data?.content} </p>  }
    <div>
      {/* <Table/> */}
    </div>
    </div>

    </>
  )
}

export default App
