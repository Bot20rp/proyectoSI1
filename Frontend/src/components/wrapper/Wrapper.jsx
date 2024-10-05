import React from "react";
import "./wapper.css"; // Asegúrate de que este archivo contenga los estilos CSS.
import {serviceData} from '../../utils/products'
export const Wrapper = () => {
  return (
    <section className="wrapper background">
      <div className="container">
        <div className="row">
          {serviceData.map((val, index) => {
            return (
              <div className="feature" style={{ backgroundColor: val.bg }} key={index}>
                <div className="icon">
                  {val.icon}
                </div>
                <h3>{val.title}</h3>
                <p>{val.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

