import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertContext from '../../context/proyectos/alertas/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoProyectos = () => {

    //extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertContext);
    const { alerta, mostrarAlerta } = alertaContext


    //Obtener proyectos cuando carga el componente

    useEffect(() => {
    //si Hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos();
    }, [mensaje])

    // revisar si proyectos tiene contenido
    if (proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;

    
    

    return (
        <ul className='listado-proyectos'>
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
        </ul>
    )
}

export default ListadoProyectos
