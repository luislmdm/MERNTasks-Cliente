import React, { useContext } from 'react'
import TareaContext from '../../context/proyectos/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext'


const Tarea = ({tarea}) => {

   // obtener la función del context de tarea
   const tareasContext = useContext(TareaContext);
   const { eliminarTarea, obtenerTareas,actualizarTarea, guardarTareaActual } = tareasContext;

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext; 

    // Extraer el proyecto
    const [proyectoActual] = proyecto

   //Función que se ejecuta cunado el usuario presiona el botn de eliminar tarea
    const tareaEliminar = id => {
      eliminarTarea(id, proyectoActual._id);
      obtenerTareas(proyectoActual._id)
    }

    //Función que modifica el estado de las tareas
    const cambiarEstado = tarea =>{
      if(tarea.estado){
          tarea.estado = false;
      } else {
        tarea.estado = true
      }
      actualizarTarea(tarea);
    }

    //Agrega una tarea acutal para editarla
    const seleccionarTarea = tarea =>{
      guardarTareaActual(tarea)
    }
     

   return (
        <li className='tarea sombra'>
          <p>{tarea.nombre}</p>
          

          <div className='estado'>
              {tarea.estado
              ? (
                  <button
                    type='button'
                    className='completo'
                    onClick={() => cambiarEstado(tarea)}
                  >Completo</button>
                )
              : (
                <button
                type='button'
                className='incompleto'
                onClick={() => cambiarEstado(tarea)}
                >Incompleto</button>
              )
            }
          </div>

          <div className='acciones'>
              <button
                type='button'
                className='btn btn-primario'
                onClick={() => seleccionarTarea(tarea)}
              >Editar</button>

              <button 
                type='button'
                className='btn btn-secundaio'
                onClick={() => tareaEliminar(tarea._id)}
              >Eliminar</button>
          </div>
        </li>
    )
}

export default Tarea
