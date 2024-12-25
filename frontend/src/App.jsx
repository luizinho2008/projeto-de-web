import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cadastro from './Cadastro';
import Login from './Login';
import Principal from './Principal';
import Deleta from './Deleta';
// import Edita from './Edita';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/site" element={<Principal />} />
        <Route path="/deletar/:id" element={<Deleta />} />
        {/* <Route path="/editar/:id" element={<Edita />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;