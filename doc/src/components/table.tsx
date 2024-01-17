import { useState } from "react"


export function Table () {

    const [ tableValues , setTableValues] = useState(null)



    return (
      
        <div className=" border border-bg-gray-500 h-[45vh] w-[40vh] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-center h-[15vh]">
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div
            onClick={(e) => {
                
            }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              O
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              O
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              O
            </div>
          </div>
        </div>
      
        <div className="space-y-2 font-medium border-t border-gray-900"></div>
      
        <div className="flex justify-center h-[15vh]">
        <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              O
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              O
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              O
            </div>
          </div>
        </div>
      
        <div className="space-y-2 font-medium border-t border-gray-900"></div>
      
        <div className="flex justify-center h-[15vh]">
        <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              O
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              O
            </div>
          </div>
          <div className="h-17 border-l border-gray-900"></div>
          <div className="group relative hover:text-8xl w-[13vh] text-center text-slate-300 hover:text-gray-500">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              X
            </div>
          </div>
        </div>
      </div>
      

    )
}

