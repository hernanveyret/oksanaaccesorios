import React from 'react';
import './productoCarrito.css'
const ProductoCarrito = ({data,borraProducto, sumarProducto, restarProducto}) => {

  return (
    <div className="cadaProducto" key={data.id}>
      <div className="imgProducto"><img src={data.imagen} alt="Imagen producto" /></div>
      <div className="descriptcionProducto">
       <p>{data.titulo}</p>
       <p>Talle: {data.talleSelect}</p>
       <p>Color: {data.color}</p>
      </div>
      <div className="accion">
        <p>$ {data.precio}</p>
        <p>{data.cant}</p>
      <div className="navBtn">
        <button className="btnSumar" onClick={(e) => sumarProducto(data.idCarrito)}></button>
        { data.cant > 1 ? 
          <button className="btnRestar" onClick={(e) => restarProducto(data.idCarrito)}></button>
        :
          <button className="btnBorrar" onClick={(e) => borraProducto(data.idCarrito)}></button>
        }
      </div>
      </div>
    </div>
    )
}
export default ProductoCarrito;