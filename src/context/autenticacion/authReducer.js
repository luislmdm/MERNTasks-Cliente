import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types";
export default (state, action) => {
    switch(action.type) {
      case REGISTRO_EXITOSO:
      case LOGIN_EXITOSO:
          localStorage.setItem('token', action.payload.token);
        //   console.log(localStorage.token);
          return{
              ...state,
              token: action.payload.token,
              autenticado: true,
              mensaje: null,
              cargando: false,
              opensesion: true
              
          }
      case OBTENER_USUARIO:

          return{
              ...state,
              autenticado: true,
              usuario: action.payload,
              cargando: false,
              
          }
      
      case LOGIN_ERROR:
      case REGISTRO_ERROR:
          localStorage.removeItem('token');
          return{
              ...state,
              token: null,
              usuario: null,
              autenticado: null,
              mensaje: action.payload,
              cargando: false
            

          }
      case CERRAR_SESION:
        
        return{
            ...state,
            token: null,
            usuario: null,
            autenticado: null,
            mensaje: action.payload,
            cargando: true,
            opensesion: false

        }



        default:
            return state;
    }
}