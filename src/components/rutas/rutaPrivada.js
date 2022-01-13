import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({children }) => {
    
    const authContext = useContext(AuthContext);
    const {opensesion, autenticado, cargando } = authContext;

    useEffect(() => {
       
    }, [opensesion, autenticado]);
   

    
    return (
        
        (!opensesion && !autenticado) || (opensesion && (!cargando && !autenticado)) ? ( <Navigate to="/"/>) : ( children )
      );
    
}

 
export default RutaPrivada;