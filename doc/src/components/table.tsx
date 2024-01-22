import { useState } from "react"
import { useRecoilValue } from "recoil"
import { WsInstance } from "../recoil/atoms/ws"
import { initValue } from "../recoil/atoms/initval"


export function Table () {

    const [ tableValues , setTableValues] = useState(null)
    const initVal  = useRecoilValue(initValue)
    const [yourEvent , setYourEvent] = useState('')
    const [enemyEvent , setEnemyEvent] = useState('')
    const wsi = useRecoilValue(WsInstance)

  console.log('the newwwwwwwwwwwwwwwww vvvvvvvvvvvvvvvvvvvvvallllllllllueeeeeeeeeeeeeeeeee of intivalue',initVal)
    wsi?.addEventListener('message', async (event: { data: any }) => {
      const d = await event.data
      const da = JSON.parse(d)
      if(da.type === 'event'){
       setEnemyEvent(da.value)
       console.log("server sending event to us from another client",JSON.stringify(da))
      }
      
    } )
    
    console.log('the value of enemy event value coming from server of enemyeventvalue',enemyEvent)
    return (
      <>
        <div className=" border border-bg-gray-500 h-[45vh] w-[40vh] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-center h-[15vh]">
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div 
            onClick={() => {
              wsi?.send(JSON.stringify(
              {
                type:"event",
                value:initVal
              }
              ))
              console.log('value register and send to server')
          }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500  justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {initVal}
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center text-white  hover:text-gray-500  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {initVal}
            </div>
          </div>
        </div>
      
        <div className="space-y-2 font-medium border-t border-gray-900"></div>
      
        <div className="flex justify-center h-[15vh]">
        <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center text-white  hover:text-gray-500  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {initVal}
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center text-white  hover:text-gray-500  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {initVal}
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center text-white  hover:text-gray-500  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {initVal}
            </div>
          </div>
        </div>
      
        <div className="space-y-2 font-medium border-t border-gray-900"></div>
      
        <div className="flex justify-center h-[15vh]">
        <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center text-white  hover:text-gray-500  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {initVal}
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center text-white  hover:text-gray-500  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {initVal}
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center text-white  hover:text-gray-500  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {initVal}
            </div>
          </div>
        </div>
        
      </div>
      <div className="text-lg text-gray-700 text-center">
       intial value : {initVal}
      </div>
      </>
    )
}

