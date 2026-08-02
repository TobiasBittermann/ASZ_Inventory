import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import MembersPage from "./pages/MembersPage.jsx";
import BierwartPage from "./pages/BierwartPage.jsx";


function App(){
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/member" element={<MembersPage/>} />
            <Route path={"/bierwart"} element={<BierwartPage/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;