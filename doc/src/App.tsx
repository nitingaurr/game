import { Table } from "./components/table"
import { useState } from "react"

function App() {

 const exampleSocket = new WebSocket(
  "ws://localhost:8080",
  "protocolOne",
 )
 const [ val, setVal ] = useState("")
  return (
    <>
    <div className="">

      your message 
      <input type="text"
      onChange={(e) => {
      setVal(e.target.value)
      }}
       className=" m-4 border border-lg "/>
      <button onClick={() => {
        console.log('sending')
          exampleSocket.send(val);

      }} >send</button>
    <p className="  mt-5 text-center text-4xl text-amber-500">
      tic-tac game
    </p>
    <div>
      <Table/>
    </div>
    </div>

    </>
  )
}

export default App
