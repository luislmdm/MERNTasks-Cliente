import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/proyectos/tareas/tareaState';
import AlertaState from './context/proyectos/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/rutaPrivada';

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="nueva-cuenta" element={<NuevaCuenta />}/>
                <Route path="proyectos" element={  
                <RutaPrivada>
                 <Proyectos/>
                </RutaPrivada> 
                }/>    
              </Routes>
            </Router>
          </AuthState>
       </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
