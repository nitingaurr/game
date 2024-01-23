import { useState } from "react"
import { useRecoilValue } from "recoil"
import { WsInstance } from "../recoil/atoms/ws"
import { initValue } from "../recoil/atoms/initval"
import { Roomid } from "../recoil/atoms/roomid"
import { recoilClientid } from "../recoil/atoms/clientid"
type M ={
  a11: string | null , a12: string | null , a13:  string | null,
  a21: string | null, a22: string | null , a23: string | null,
  a31: string | null, a32: string | null , a33: string | null
}

export function Table () {

    const ticVal:M = {
      a11:null , a12:null , a13:null,
      a21:null, a22:null , a23:null,
      a31:null, a32:null , a33:null
    }  
    const [ tableValues , setTableValues] = useState(ticVal)
    const initVal  = useRecoilValue(initValue)
    const roomid = useRecoilValue(Roomid)
    const clientid = useRecoilValue(recoilClientid)
    // const [yourEvent , setYourEvent] = useState('')
    const [enemyEvent , setEnemyEvent] = useState('')
    const wsi = useRecoilValue(WsInstance)
    
    const updateTicVal = (key: keyof M, value: string) => {
      setTableValues((prevMatrix) => ({
        ...prevMatrix,
        [key]: value, // Update the specific value
      }));
    };
  
 
  console.log('the newwwwwwwwwwwwwwwww vvvvvvvvvvvvvvvvvvvvvallllllllllueeeeeeeeeeeeeeeeee of intivalue',initVal)
    wsi?.addEventListener('message', async (event: { data: any }) => {
      const d = await event.data
      const da = JSON.parse(d)
      if(da.type === 'event'){
       setEnemyEvent(da.value)
       updateTicVal(da.position,da.value)
       console.log("server sending event to us from another client",JSON.stringify(da))
      }
      
    } )
    
    console.log('the value of enemy event value coming from server of enemyeventvalue',enemyEvent)
    return (
      <>
        <div className=" border border-bg-gray-500 h-[45vh] w-[40vh] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-center h-[15vh]">
          
            { tableValues.a11 === null  && 
            <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  position:"a11",
                  cid:clientid,
                  rid:roomid,
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div>   </div>}
            {
              (tableValues.a11 === 'O' || tableValues.a11 === 'X')  &&
              <div className="text-8xl w-[13vh] text-center text-gray-500">
              <div
              className=" flex items-center text-gray-500  justify-center ">
                {tableValues.a11}
              </div>
              </div>
            }
            
        
          <div className="h-17 border-l border-gray-900"></div>
          
          { tableValues.a12 === null  && 
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
          <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  position:"a12",
                  cid:clientid,
                  rid:roomid,
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div> 
            </div>
            }
            {
              (tableValues.a12 === 'O' || tableValues.a12 === 'X')  &&
              <div className="text-8xl w-[13vh] text-center text-gray-500">
              <div
              className=" flex items-center text-gray-500  justify-center ">
                {tableValues.a12}
              </div>
              </div>
            }
         
          <div className="h-17 border-l border-gray-900"></div>
          
          { tableValues.a13 === null  &&
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
          <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  position:"a13",
                  cid:clientid,
                  rid:roomid,
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div> 
            </div>
            }
           {
              (tableValues.a13 === 'O' || tableValues.a13 === 'X')  &&
              <div className="text-8xl w-[13vh] text-center text-gray-500">
              <div
              className=" flex items-center text-gray-500  justify-center ">
                {tableValues.a13}
              </div>
              </div>
            }
          </div>
        
      
        <div className="space-y-2 font-medium border-t border-gray-900"></div>
      
        <div className="flex justify-center h-[15vh]">
       
        { tableValues.a21 === null  && 
         <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
        <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  position:"a21",
                  cid:clientid,
                  rid:roomid,
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div>
            </div> }
            {
              (tableValues.a21 === 'O' || tableValues.a21 === 'X')  &&
              <div className="text-8xl w-[13vh] text-center text-gray-500">
              <div
              className=" flex items-center text-gray-500  justify-center ">
                {tableValues.a21}
              </div>
              </div>
            }
         
          <div className="h-17 border-l border-gray-900"></div>
         
          { tableValues.a22 === null  &&
           <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
          <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  position:"a22",
                  cid:clientid,
                  rid:roomid,
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div> 
            </div>}
            {
              (tableValues.a22 === 'O' || tableValues.a22 === 'X')  &&
              <div className="text-8xl w-[13vh] text-center text-gray-500">
              <div
              className=" flex items-center text-gray-500  justify-center ">
                {tableValues.a22}
              </div>
              </div>
            }
         
          <div className="h-17 border-l border-gray-900"></div>
          
          { tableValues.a23 === null  && 
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
          <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  position:"a23",
                  cid:clientid,
                  rid:roomid,
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div> 
            </div>}
            {
              (tableValues.a23 === 'O' || tableValues.a23 === 'X')  &&
              <div className="text-8xl w-[13vh] text-center text-gray-500">
              <div
              className=" flex items-center text-gray-500  justify-center ">
                {tableValues.a23}
              </div>
              </div>
            }
          </div>
        
      
        <div className="space-y-2 font-medium border-t border-gray-900"></div>
      
        <div className="flex justify-center h-[15vh]">
       
        { tableValues.a31 === null  &&
         <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
        <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  position:"a31",
                  cid:clientid,
                  rid:roomid,
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div>
            </div>
             }
             {
              (tableValues.a31 === 'O' || tableValues.a31 === 'X')  &&
              <div className="text-8xl w-[13vh] text-center text-gray-500">
              <div
              className=" flex items-center text-gray-500  justify-center ">
                {tableValues.a31}
              </div>
              </div>
            }
          
          <div className="h-17 border-l border-gray-900"></div>
          
          { tableValues.a32 === null  &&
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
          <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  position:"a32",
                  cid:clientid,
                  rid:roomid,
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div> 
            </div>
            }
            {
              (tableValues.a32 === 'O' || tableValues.a32 === 'X')  &&
              <div className="text-8xl w-[13vh] text-center text-gray-500">
              <div
              className=" flex items-center text-gray-500  justify-center ">
                {tableValues.a32}
              </div>
              </div>
            }
         
          <div className="h-17 border-l border-gray-900"></div>
          
          { tableValues.a33 === null  &&  
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
          <div
            onClick={() => {
                wsi?.send(JSON.stringify(
                {
                  type:"event",
                  position:"a33",
                  cid:clientid,
                  rid:roomid,
                  value:initVal
                }
                ))
                console.log('value register and send to server')
            }}
            className="absolute inset-0 flex items-center text-white  hover:text-gray-500 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {initVal}
            </div> 
            </div>
            }
           {
              (tableValues.a33 === 'O' || tableValues.a33 === 'X')  &&
              <div className="text-8xl w-[13vh] text-center text-gray-500">
              <div
              className=" flex items-center text-gray-500  justify-center ">
                {tableValues.a33}
              </div>
              </div>
            }
          </div>
      </div>
      {/* <div className="text-lg text-gray-700 text-center">
       intial value : {initVal}
      </div> */}
      </>
    )
}

