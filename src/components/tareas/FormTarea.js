import React, {useContext, useState, useEffect} from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/proyectos/tareas/tareaContext';

const FormTarea = () => {

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(ProyectoContext);
    const { proyecto } = proyectosContext; 

    // obtener la función del context de tarea
    const tareasContext = useContext(TareaContext);
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //Effect que detecta si hay uan tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        } else{
            guardarTarea({
                nombre:''
            })
        }
    }, [tareaseleccionada]);

    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: '',
    })

    // extraer el nombre del proyecto
    const {nombre} = tarea
   
    //Si no hay proyecto seleccionado
    if (!proyecto) return null; 

    // Array desctrucuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
            
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === ''){
            validarTarea();
            return
        }
        //Si es edición o Nueva tarea
        if(tareaseleccionada === null) {
            //Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            // console.log(tarea)
            agregarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);
            //Elimina tarea seleccionada del state
            limpiarTarea();
        }
       

        // Obtener y filtrar las lareas del proyecto acutal
        obtenerTareas(proyectoActual._id)

        //Reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input 
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className='contenedor-input'>
                    <input 
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null}            
        </div>
    )
}

export default FormTarea
