import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import Tarea from './Tarea'
import TareaContext from '../../context/proyectos/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {
    // Extraer state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext; 

    // obtener las tareas del proyecto
    const tareasContext = useContext(TareaContext);
    const {tareasproyecto} = tareasContext;

    //Si no hay proyecto selecciona
    if (!proyecto) return <h2>Selecciona un proyecto</h2>; 
    
    // Array desctrucuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;
   
    // Elimina un proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id)

    
    }
    
    return (
        <>
        
        
        <h2>Proyecto: {proyectoActual.nombre}</h2>
        
        <ul className='listado-tareas' 
            >
            
              
            {tareasproyecto.length === 0
                ?(<li className='tarea'><p>No hay tareas</p></li>)
                : null   }            
                <TransitionGroup>
                    {tareasproyecto.map(tarea => (
                    <CSSTransition
                    key={tarea._id}
                            timeout={200}
                            classNames="tarea"
                            
                            
                        >
                            <Tarea 
                                tarea={tarea}
                                key={tarea._id}
                            />
                    </CSSTransition>
                ))}
                
                </TransitionGroup>
                
            
             {/* <ul className='listado-proyectos'>
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
            {proyectos.map(proyecto => (                
                <CSSTransition
                    key={proyecto._id}
                    timeout={200}
                    classNames='proyecto'
                 >                    
                    <Proyecto                
                        proyecto={proyecto}
                />
                    </CSSTransition>                
            ))}
            </TransitionGroup>
        </ul> */}

            {/* {tareasproyecto.length === 0
            ?(<li className='tarea'><p>No hay tareas</p></li>)
            : tareasproyecto.map(tarea =>   
                <Tarea 
                key={tarea._id}
                tarea={tarea}
                />
            )
        } */}
                        
        </ul>
       
        <button
            type='button'
            className='btn btn-eliminar'
            onClick={onClickEliminar}
        >Eliminar Proyecto &times;</button>
        
        </>
    );
}

export default ListadoTareas
