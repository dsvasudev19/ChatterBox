

import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from './src/pages/auth/SignUp'
import Login from './src/pages/auth/Login'
import Home from './src/pages/Home'
import ChatterBox from "./src/pages/ChatterBox";
import Profile from "./src/pages/Profile";
const Router=()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<SignUp />}/>
                <Route path="/chat" element={<ChatterBox />}/>
                <Route path="/profile" element={<Profile />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;