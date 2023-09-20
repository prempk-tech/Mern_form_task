import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../src/App.css';
import Home from "./components/Home";
import FormPage from "./components/FormPage";
import Dashboard from "./components/Dashboard";
import Details from "./components/Details";
import Edituser from "./components/Edituser";


function Router(){
    return(
<div className="App">
<BrowserRouter>
<Routes>
    <Route exact path='/' element={<Home />} />
    <Route path='/userPage' element={<FormPage />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/detailpage/:id' element={<Details />} />
    <Route path='/Edituser' element={<Edituser />} />
</Routes>
</BrowserRouter>
</div>
    )
}
export default Router;