import React from 'react';
import './lupa.css';

const Lupa = ({closeModal,imgLupa}) => {
  return (
    <div className="contenedorLupa">      
       <div className="contenedor-img">
            <img src={imgLupa} alt="Imagen del producto" />
       <button className="btnCerrar" onClick={closeModal}>❌</button>
      </div>
   </div>
            
 )
};

export default Lupa;