import React from 'react';
import './inicio.css'
import Logo from '../img/logo.png'
function Inicio({setInicio, setHome}){
  return (
    <>      
      <div className="contenedorBanner">
        <div className="contenedorImg">
          <div className="mediaBola"><img src={Logo} alt="Logo" className="img-logo"/></div>
        </div>
        <div className="textoBienvenida">
          <h2 className="titulo-inicio">BIENVENIDOS</h2>
          <button className="btn-entrar" onClick={() => {setInicio(false); setHome(true)}}>ENTRAR</button>
        </div>
      </div>
    </>
  )
}
export default Inicio;