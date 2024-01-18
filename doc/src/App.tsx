import { BrowserRouter,Route, Routes } from "react-router-dom"
import { Home } from "./home";
import { Play } from "./mainPage";
import { RecoilRoot } from "recoil";




export default function App() {

  return(
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="play" element={  <Play/>}/>
    
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  )

 
}


