import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/global.css';

import Home from './pages/listar/ListarPessoas';
import Editar from './pages/editar/EditarItem';
import Cadastro from './pages/cadastrar/Cadastro';



function App(){
  return (
    <div className="w-full min-h-screen">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Cadastro" element={<Cadastro/>}/>
          <Route path="/Editar/:id" element={<Editar/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    )
  }

export default App;