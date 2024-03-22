import React, { useState, useEffect } from 'react';
import FavOffNav from "../img/fav.webp";
import FavOn from "../img/favOn.webp";
import "./cards.css";

const Cards = ({ openModal,data,idFavorito,ingresarProductos,setProductoVendido,setTalleSelect }) => {

let idValidacionTalle = data.id + "talle";
  
  //crea un select con talles unicos o con letras
const Select = ({data}) => {
  const [ options, setOptions] = useState([])
  useEffect(() => {
    setOptions(data.talle)
  },[data])
  return (
        options.map((e,i) => {
          return <option value={e} key={i}>{e}</option>
        })
  )
}

//crea un select con talles en numeros
const SelectXnumero = ({data}) => {
    //let talles =  data.talleFin - data.talleInit
  let talles = [] 
  for ( let i = data.talleInit; i <= data.talleFin; i++){
      talles.push(i)
  }
     
  return (
       talles.map((e,i) => <option key={i} value={e}>{e}</option>)
  )
}

 // Indica el talle seleccionado
 const selectNumber = (talle) => {
  let talleProducto = talle.currentTarget.value;
  setTalleSelect(talleProducto) 
 }
 
  return (
    <div className="tarjeta" key={data.key}>
      <h4 className="titulo">{data.titulo}</h4>
        <img src={data.vendido ? data.imagenStock : data.imagen} alt="imagen" />
          <p className="validacion-talles" id={idValidacionTalle}></p>
          { data.off && <p className="cartel-oferta">OFERTA!!!</p> }
          <select onChange={selectNumber}>
            <option>Talles</option>
            {data.talle.length > 0 ? <Select data={data}/> : <SelectXnumero data={data}/>}          
          </select>
          <div className="Descripcion">
            <p>{data.descripcion}</p>
          </div>
          <p>{data.color}</p>

          {
            data.off ? <span style={{width:"100%",padding:"2px",  display: "flex", justifyContent:"space-evenly", fontWeight:"700"}}> <p style={{fontSize:"1em", textDecoration:"line-through"}}>$ { data.precioUnitario }</p> | <p style={{fontSize:"1em",color:"red"}}>${ data.precio }</p> </span> : <p style={{fontSize:"1em",fontWeight:"600"}}>${ data.precioUnitario }</p>
          }
        
          <div className="navCard">
            <button className="btnCard" onClick={()=> idFavorito(data.id)}>{data.favorito ? <span title="Quitar producto de favoritos"><img src={FavOn} alt="Ico Favoritos" /></span> : <span title="Ingresar producto a favoritos"><img src={FavOffNav} data-id={data.id} alt="Ico Favoritos" /></span>}</button>
            <button className="btnCard lupa" onClick={(e) => openModal(data.id)} title="Agrandar imagen" ></button>
            <button className="btnCard carrito" onClick={ data.vendido ? () => {setProductoVendido(true)} : () => {ingresarProductos(data.id)} }  title="Agregar producto al carrito" >comprar</button>
          </div>
    </div>
  )
}
export default Cards;