import React,{ useState, useEffect} from 'react';
import Cards from "./Cards";
import Error from './Error';
import Lupa from './Lupa';
import Carrito from './Carrito';
import CheckCompra from './CheckCompra';
import Info from './Info';
import NoDisponible from './NoDisponible';
import Loader from '../Componentes/Loader';
import CheckCarrito from '../Componentes/CheckCarrito';
import Favoritos from "./Favoritos";
import Inicio from './Inicio';
import './Main.css';
import './Loader.css';
//Imagenes de los botones 
import HomeFalse from "../img/homeFalse.webp";
import HomeTrue from "../img/homeTrue.webp";
import FavOn from "../img/favOn.webp";
import FavOff from "../img/favOff.webp";
import CarritoOf from '../img/carritoOf.webp';
import CarritoOn from '../img/carritoOn.webp';
import InfoOf from '../img/infoOf.webp';
import InfoOn from '../img/infoOn.webp';
import ShopOn from '../img/shopOn.webp'
import ShopOff from '../img/shopOff.webp'

const Main = () => {
  const [inicio, setInicio] = useState(true)
  const [home, setHome] = useState(false)
  const [Fav, setFav] = useState(false)
  const [lupa, setLupa] = useState(false)
  const [carrito, setCarrito] = useState(false)
 

  const [db, setDb] = useState([])
  const [error, setError] = useState("")
  //const [localS, setLocalS] = useState(localStorage.getItem("favoritosAppOff")) // ve si hay productos en localStorage 
  const localS = localStorage.getItem("favoritosOksana");
  const [favoritos,setFavoritos] = useState(localS ? JSON.parse(localS) : []) // si hay los agrega al estado y si no crea un array vacio
  const [imgLupa, setImgLupa] = useState("");
  const [productos, setProductos] = useState([])
  const [total, setTotal] = useState(0)
  const [checkproducto, setCheckproducto] = useState(false)
  const [productoVendido, setProductoVendido] = useState(false)
  const [repetido, setRepetido] = useState(false)
  const [info, setInfo] = useState(false);
  const [loading, setLoading] = useState(false)
  const [cantidadProductos, setCantidadProductos] = useState(0)

  //const url = "http://localhost:5000/ofertas"  
  const url = "https://raw.githubusercontent.com/hernanveyret/oksanaaccesorios/main/src/Api/data.json"

 useEffect(() => {
   const dataFetch = async () => {    
    setLoading(true)
    try {
        const res = await fetch(url);        
        if(!res.ok){
          const errorData = {
            status:res.status || "00",
            statusText:res.statusText || "Error, id_Interno: no se pudo comunicar con la base de datos."
          }
          throw errorData;           
        }
        const data = await res.json()
        // Verifica si un producto tiene descuento, si lo tiene calcula el precio y lo modifica
        const dataConDescuento = data.map(item => {
          if (item.off) {
            item.precio = calcularDescuento(item.precio, item.porcentaje);
          }
          return item;
        });
  
        setDb(dataConDescuento);
        setLoading(false)
    }catch(err){
      setError(err)
      const message = `Error: ${err.status}, ${err.statusText}`
      console.log(message)
      setLoading(false)
    }
  }
  dataFetch()  
 },[url,favoritos])

 const calcularDescuento = (precio,descuento) => {
    let subtTotal = Math.round((precio / 100) * descuento);
    return  precio - subtTotal;
 }

// Verifica si hay productos en favoritos, cambia el valor por defecto para mostrar la estrella en pantalla
favoritos.forEach(e => {
  db.forEach(a => {
    if(e.id === a.id){
      a.favorito = e.favorito
    }
  })  
})

 //Capturo el id del producto, lo guardo en una variable y se guarda dentro del estado
 const idFavorito = (id) => {
 const filtro = db.filter(elemento => elemento.id === id)
    filtro[0].favorito = !filtro[0].favorito
      /* Si el valor del producto es falso, crea un nuevo array con todos los elementos diferentes al id seleccionado 
      y actualiza el estado con esos productos para eliminar al que quedo como false. */
    if(filtro[0].favorito === false) {
      const deleteFavorito = favoritos.filter(e => e.id !== filtro[0].id)
      setFavoritos(deleteFavorito)
    }else {
      setFavoritos([...favoritos,filtro[0]])
    }   
 }

 // si estas en la pestaña de favoritos y eliminas el ultimo pasa a la pestaña de home
 useEffect(() => {
  localStorage.setItem("favoritosOksana",JSON.stringify(favoritos))
  if(favoritos.length === 0){
    setFav(false)
    setHome(true)
  }
 },[favoritos])

 // Abre ventana modal con la imagen del producto
 const openModal = (id) => {
  const productoLupa = db.filter(e => e.id === id)
  let img = productoLupa[0].imagen
  setImgLupa(img)
  setLupa(true);
 }

// cierra la venta modal
 const closeModal = () => {
  setLupa(false);
 }

 const cerrarVendido = () => {
  setProductoVendido(false);
 }

 
   //Ingresa el producto seleccionado al carrito
   const ingresarProductos = (id) => {
    //Toma el valor que tiene el select en el momento y lo guarda en una variable
   const miSelectTalle = document.getElementById(`${id}select`);
   let selectedTalle = miSelectTalle.value
 
 let validacionId = id + "talle";
 let validacion = document.getElementById(validacionId);
 if(selectedTalle === null || selectedTalle === 'Talles') {
   validacion.innerHTML ="* Ingrese un talle"
 }else{
 const productoCarrito = db.filter(e => e.id === id);

 for ( let i = 0; i < productos.length; i++){
   if(productos[i].id === id && productos[i].talleSelect === selectedTalle){
     setRepetido(true)
     return;
   }
 };

   //Al nuevo producto seleccionado le agrego la propiedad talle
 productoCarrito[0] = {...productoCarrito[0],talleSelect: selectedTalle}
 productoCarrito[0] = { ...productoCarrito[0],idCarrito: validacionId+selectedTalle}
   // Al nuevo producto seleccionado le agrego una cantidad
 productoCarrito[0] = {...productoCarrito[0],cant: 1}
 productoCarrito[0] = { ...productoCarrito[0],key: Math.random() }
 //productoCarrito[0].id = Math.random()
   setProductos([...productos,productoCarrito[0]]);
   setCheckproducto(true);
   selectedTalle = null
   validacion.innerHTML =""
}
}

  //Borra el producto del carrito de compras
 const borraProducto = (id) => {
  const isDelete = productos.filter(e => e.idCarrito !== id)
  setProductos(isDelete)
 }

  // suma el precio de los productos  
 useEffect(() => { 
  const $total = productos.reduce((e,i) => e + i.precio,0)  
  setTotal($total)
  const $totalProductos = productos.reduce((e,i) => e + i.cant, 0)
  setCantidadProductos($totalProductos)  
 },[productos])

 // Suma la cantidad de productos unitarios en el carrito de compras.
 const sumarProducto = (id) => {
  const sumaCantidad = productos.map(e => {
    if( e.idCarrito === id ) {
      return {
        ...e,
        cant: e.cant + 1,
        precio: e.precio + e.precioUnitario
      }
    }
    return e;
  })
  setProductos(sumaCantidad)
 }

 // Resta la cantidad de productos unitarios en el carrito de compras
  const restarProducto = (id) => {
  const restaCantidad = productos.map(e => {
    if( e.idCarrito === id ) {
      return {
        ...e,
        cant: e.cant - 1,
        precio: e.precio - e.precioUnitario
      }
    }
    return e;
  })
  setProductos(restaCantidad)
 }
 
 //{ Fav &&  favoritos.map(e => (<Cards data={e} key={e.id} idFavorito={idFavorito} openModal={openModal} ingresarProductos={ingresarProductos} setProductoVendido={setProductoVendido}/>)) } 
 
 return (

    <>
      <header>
        <h1 className="tituloApp" id="cabecera">Oksana Accesorios</h1>
      </header>
      <nav>
        <button className="btnNav" onClick={() => {setInicio(true); setHome(false); setFav(false); setCarrito(false);setInfo(false)}} ><span title="Pagina principal">{inicio ? <img src={HomeTrue} alt="Ico Home true" />: <img src={HomeFalse} alt="Ico Home False" />}</span></button>
        <button className="btnNav" onClick={() => {setHome(true); setFav(false); setCarrito(false);setInfo(false); setInicio(false)}} ><span title="Tienda">{home ? <img src={ShopOn} alt="Ico shop true" />: <img src={ShopOff} alt="Ico shop False" />}</span></button>
        <button className="btnNav" onClick={() => {setFav(true); setHome(false); setCarrito(false);setInfo(false); setInicio(false)}} ><span title="Tus favoritos">{Fav ? <img src={FavOn} alt="Ico Home true" />: <img src={FavOff} alt="Ico Home False" />}{favoritos.length}</span></button>
        <button style={{color:"red"}} className="btnNav" onClick={() => {setCarrito(true); setHome(false); setFav(false); setInicio(false)}}><span title="Tu Pedido">{ carrito ? <img src={CarritoOn} alt="icono del carrito"/> : <img src={CarritoOf} alt="icono del carrito"/>}{cantidadProductos}</span></button>
        <button className="btnNav" onClick={() => {setInfo(true)}} ><span title="Informacion">{info ? <img src={InfoOn} alt="Ico Info" />:<img src={InfoOf} alt="Ico Info" />}</span></button>
      </nav>
      <div className="loading">{ loading && <Loader /> }</div>
      <section id="main">
        { inicio && <Inicio setInicio={setInicio} setHome={setHome}/>}
        { carrito && <Carrito productos={productos} setProductos={setProductos} cantPares={cantidadProductos} total={total} borraProducto={borraProducto} sumarProducto={sumarProducto} restarProducto={restarProducto} setCarrito={setCarrito} setHome={setHome}/>}
        { lupa && <Lupa closeModal={closeModal} imgLupa={imgLupa}/> }
        { home && db.map(e => (<Cards data={e} key={e.id} idFavorito={idFavorito} openModal={openModal} ingresarProductos={ingresarProductos} setProductoVendido={setProductoVendido}/>)) }
        { Fav && <Favoritos favoritos={favoritos} idFavorito={idFavorito} openModal={openModal} ingresarProductos={ingresarProductos} setProductoVendido={setProductoVendido}/>}
        { error && <Error msj={error} /> }
        { checkproducto && <CheckCompra setCheckproducto={setCheckproducto}/> }
        { info && <Info setInfo={setInfo}/> }
        { productoVendido && <NoDisponible cerrarVendido={cerrarVendido} />}
        { repetido && <CheckCarrito setRepetido={setRepetido}/>}
      </section>
      <a href="#cabecera" className="flecha">Flecha</a>
      <a href="https://wa.me/541134025499" target="_blanck" className="whatsAap"><span title="Envianos tu consulta">WhatAaap</span></a>
      <footer>
        <div className="footer-oksana">
        <p>Oksana Accesorios</p> 
        <a className="ico-facebook" href="https://www.facebook.com/xoana.oksanaaccesorios" target="_blank" rel="noopener noreferrer">FACEBOOK</a>
        <a className="ico-instagram" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
        </div>

        <div className="footer-diseñador">
          <p>Diseño - Hernán Luis Veyret - 2024</p> 
          <p>Version 2.1</p>
        </div>

      </footer>
    </>
  )
} // 🏠 ⭐🗑️
export default Main;