import { BrowserRouter,Route, Routes } from "react-router-dom"
import { Home } from "./home";
import { Play } from "./mainPage";




export default function App() {

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="play" element={  <Play/>}/>
    
    </Routes>
    </BrowserRouter>
  )

 
}


