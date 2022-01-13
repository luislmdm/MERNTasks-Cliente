import React, {useState, useContext, useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import AlertaContext from '../../context/proyectos/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

    const history = useNavigate()

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;
    
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario, } = authContext;

    // En caso de que el usuario se haya autentiaado o registrado o sea un registro duplicado
    useEffect(() => {
        if(autenticado) {
            history('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    }, [mensaje, autenticado, props.history])

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const {nombre, email, password, confirmar} = usuario

    const onChange = (e) =>{
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        // validar campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '')
        {  mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //password minimo de 6 caracteres
        if(password.length < 6){
          mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
          return;
        }

        //2 Password iguales
        if(password !== confirmar){
          mostrarAlerta('Los passwords no coinciden', 'alerta-error');
          return;
        }
        //Pasaro al action
        registrarUsuario({
            nombre,
            email,
            password
        });
    }

    return (
        <div className='form-usuario'>
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className='contenedor-form sombra-dark'>
                <h1>Crear Cuenta</h1>
                <form 
                    onSubmit={onSubmit}
                >
                     <div className='campo-form'>
                        <label htmlFor='nombre'>Nombre</label>
                        <input
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Tu Nombre'
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Tu email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Tu Password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='confirmar'>Confirmar Password</label>
                        <input
                            type='password'
                            id='confirmar'
                            name='confirmar'
                            placeholder='Repite tu Password'
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <input type="submit" className='btn btn-primario btn-block'
                        value='Registrarme' />
                    </div>
                </form>

                <Link to={'/'} className='enlace-cuenta'>
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    )
}

export default NuevaCuenta