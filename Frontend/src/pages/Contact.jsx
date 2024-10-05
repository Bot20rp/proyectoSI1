import React from 'react'
import { useForm } from "react-hook-form"
import './contact.css'
export const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => console.log(data)
  return (
    <>
   <div className="container">
      <div className="contact-box">
        <div className="left"></div>
        <div className="right">
          <h2>Si tienes alguna duda sobre nuestros productos , no dudes en contactarnoss!!!</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ----------------------------------para el nombreee */}
            <input
              type="text"
              className="field"
              placeholder="Ingresa tu nombre"
              {...register("name", { required: "El nombre es requerido" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
            {/* --------------------------------para el correo  */}
            <input
              type="text"
              className="field"
              placeholder="YIngresa tu correo electronico"
              {...register("email", {
                required: "El correo es requeridoo",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email format"
                }
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            {/* ----------------------------------para el numero telefonico */}
            <input
              type="text"
              className="field"
              placeholder="Ingresa tu numero telefonico"
              {...register("phone", {
                required: "El numero de celular es requeridoo",
                minLength: {
                  value: 8,
                  message: "El número de teléfono debe tener al menos 8 dígitos"
                }
              })}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            {/* -----------------------------------parte del mensajeee */}
            <textarea
              placeholder="Ingresa el mensaje"
              className="field"
              {...register("message", { required: "El mensaje es requerido" })}
            />
            {errors.message && <p>{errors.message.message}</p>}

            <button className="btn" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
