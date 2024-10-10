import '../css/RegisterClientPage.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { registerRequest } from "../api/auth";

function RegisterClientPage() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    // En la función onSubmit
    const onSubmit = async (data) => {
        setLoading(true); // Iniciar carga
        try {
            const res = await registerRequest(data);
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
                    <h1> REGISTRAR CLIENTE</h1>
                </div>
                <div   disabled={loading}>
                    {loading ?<p className="successMessage" >Registrando...</p> : '...........'  }
                </div>
                <div className="client">
                    <div className="inputWrapper">
                        <label htmlFor="nit">NIT</label>
                        <input
                            className="inputClient"
                            type="number"
                            placeholder="NIT"
                            {...register('NumeroDocumento', { required: true })}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="ci">CI</label>
                        <input
                            className="inputClient"
                            type="number"
                            placeholder="CI"
                            {...register('ci', { required: true })}
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
                            {...register('Contrasena', { required: true, minLength:8 })}
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
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegisterClientPage;
