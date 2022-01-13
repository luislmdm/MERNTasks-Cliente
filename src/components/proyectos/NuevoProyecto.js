import React, {useState, useContext} from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(ProyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;
    
   

   
    //state para proyecto

    const [proyecto,guardarProyecto] = useState({
        nombre:''
    });

    //Estraer nombre de proyecto
    
    const {nombre} = proyecto;

    // Lee los contenidos del input

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]:e.target.value
        })
    }

    // cuando el usuario envia un proyecto

    const onSubmitProyecto = e =>{
        e.preventDefault();

        //Validar el proyecto
        if(nombre === ''){
            mostrarError();
            return
        }
     

        //agregar el state
        agregarProyecto(proyecto)

        //reiniciar el form
        guardarProyecto({
            nombre: ''            
        })

 
               
    }



    return (
        <>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={() => mostrarFormulario() }
            >NuevoProyecto
            </button>
            { formulario ?
             (
                <form 
                        className='formulario-nuevo-proyecto'
                        onSubmit={onSubmitProyecto}
                    >
                        
                    <input
                            type='text'
                            className='input-text'
                            placeholder='Nombre Proyecto'
                            name='nombre'
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                    <input
                            type='submit'
                            className='btn btn-primario btn-block '
                            value='Agragar Proyecto'
                    />

                </form>
             ): null }

             { errorformulario ? <p className='mensaje error'>El nombre del Proyecto es obligatorio</p> :null}
        </>
    )
}

export default NuevoProyecto
