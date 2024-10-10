import '../css/RegisterClientPage.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { registerEmpleado} from "../api/auth";

function RegisterEmplead() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    // En la función onSubmit
    const onSubmit = async (data) => {
        setLoading(true); // Iniciar carga
        try {
            console.log(data)
            const res = await registerEmpleado(data);
            if (res.data) {
                reset(); // Limpiar el formulario después del éxito
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false); // Finalizar carga
    };

    return (

        <div className="contenedorClient">
            <form className="formRegisterClient" onSubmit={handleSubmit(onSubmit)}>
                <div id='titleRegisterClient'>
                    <h1> REGISTRAR ENCARGADO DE TIENDA</h1>
                </div>
                <div   disabled={loading}>
                    {loading ?<p className="successMessage" >Registrando...</p> : '...........'  }
                </div>
                <div className="client">
                    <div className="inputWrapper">
                        <label htmlFor="nit">CI</label>
                        <input
                            className="inputClient"
                            type="number"
                            placeholder="CI"
                            {...register('NumeroDocumento', { required: true })}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="name">Nombre</label>
                        <input
                            className="inputClient"
                            placeholder="Nombre"
                            {...register('Nombre', { required: true })}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="email">Correo</label>
                        <input
                            className="inputClient"
                            type="email"
                            placeholder="Correo"
                            {...register('Correo', { required: true })}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            className="inputClient"
                            type="password"
                            placeholder="Contraseña"
                            {...register('Contrasena', { required: true, minLength:8  })}
                        />
                        {errors.Contrasena?.type === 'required' && <small>El campo no puede estar vacío</small>}
                        {errors.Contrasena?.type === 'minLength' && <small>La contraseña debe tener al menos 8 caracteres</small>}
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="Telefono">Teléfono</label>
                        <input
                            className="inputClient"
                            type="number"
                            placeholder="telefono"
                            {...register('telefono', { required: true })}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="Salario">Salario</label>
                        <input
                            className="inputClient"
                            type="number"
                            placeholder="Salario"
                            {...register('Salario', { required: true })}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="birthdate">Fecha de Nacimiento</label>
                        <input
                            className="inputClient"
                            type="date"
                            placeholder="Fecha de Nacimiento"
                            {...register('FechaNacimiento', { required: true })}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="gender">Género</label>
                        <select
                            className="inputClient"
                            {...register('Sexo', { required: true })}
                        >
                            <option value="">Selecciona tu género</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="O">Otro</option>
                        </select>
                        <input
                            type="hidden"
                            value="NIT"
                            {...register('tipoDocumento')}
                         />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="HorarioIni">Horario Inicio</label>
                        <input
                            className="inputClient"
                            type="time"
                            placeholder="Horario Inicio"
                            {...register('HorarioInicio', { required: true })}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="HorarioFin">Horario Salida</label>
                        <input
                            className="inputClient"
                            type="time"
                            placeholder="Horario Salida"
                            {...register('HorarioFin', { required: true })}
                        />
                    </div>
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegisterEmplead;
