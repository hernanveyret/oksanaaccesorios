import React, { useState } from 'react';
import ProductoCarrito from "./ProductoCarrito";
import "./carrito.css"
import ImgCarritoVacio from "../img/carritoVacio.webp";

const Carrito = ({productos,setProductos,cantPares,total,borraProducto,sumarProducto, restarProducto, setCarrito,setHome}) => {
  const [nombre, setNombre] = useState("");
  
  const handleNombre = (e) => {
    setNombre(e)
  }
 
  const enviarPedido = () => {
    if(nombre){ 
      const tel = `541134025499`;
    let msg =`Mi pedido:\n`;
        msg += `Me llamo ${nombre}\n`
    productos.forEach(e => {
       msg += `${e.titulo} / Talle: ${e.talleSelect} / ${e.color} / Cant: ${e.cant} / $${e.precio} |\n`       
    })
        msg += `Total: $${total}`

    const urlTel = `https://api.whatsapp.com/send?phone=${tel}&text=${encodeURIComponent(msg)}`;
    window.open(urlTel,'_blank');
    setProductos([])
    setCarrito(false)
    setHome(true)
  }else {
    let $input = document.getElementById("nombre-validacion");
    $input.style.display = "block";
  }    
  }    

  const CarritoVacio = () => {
    return (
      <>
        <h2 className="tituloCarrito">Tu Carrito Esta Vacio</h2>
        <img src={ImgCarritoVacio} alt="imagen carrito vacio" className="carritoVacioImg"/>
      </>
    )
  }
  
  return (
    <div className="contenedorCarrito">
      { productos.length > 0 ? <h1 className="tituloPedidos">Tu pedido</h1> : ""}
      { productos.length > 0 ? productos.map(e => <ProductoCarrito key={e.key} data={e} borraProducto={borraProducto} sumarProducto={sumarProducto} restarProducto={restarProducto} /> ) :  <CarritoVacio /> }
      <div className="navTotal">
        <div className="cantProductos">
          <p>Cant P.</p>
          <p>{cantPares}</p>
        </div>
        <div className="botonera">
          <button onClick={enviarPedido}>ENVIAR PEDIDO</button>
          <input type="text" name="nombre" placeholder="Nombre" required className="inputName" onChange={(e) => {handleNombre(e.target.value)}}/>
          <p className="validacion-nombre" id="nombre-validacion">* Ingrese su nombre</p>
        </div>
        <div className="importe">
          <p>TOTAL</p>
          <p>$ {total}</p>
        </div>
      </div>
    </div>
  )
}
export default Carrito;