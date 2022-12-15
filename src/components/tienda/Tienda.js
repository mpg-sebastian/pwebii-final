import React, { useEffect, useState } from "react";
import { BsFillBasketFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ApiWebURL } from "../../utils";
import Producto from "../producto/Producto";

function Tienda() {
  const [listaProductos, setListaProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const fetchData = (url) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fetch(url);
        const json = await data.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

  const leerServicio = async () => {
    const rutaServicio = `${ApiWebURL}/productos.php`;
    const data = await fetchData(rutaServicio);
    setListaProductos(data);
  };

  const seleccionarUsuario = (event, item) => {
    // console.log(item);
    setProductoSeleccionado(item);

    var itemsLista = document.querySelectorAll("#lista-categorias li");
    itemsLista.forEach((item) => {
      item.classList.remove("active");
    });

    event.currentTarget.classList.add("active");
    //event.currentTarget hace referencia al objeto que recibió el evento
    //classList.add("active") indica que a la lista de clases se está añadiendo
    //la clase active
  };

  return (
    <section id="tienda" className="padded">
      <div className="container my-4">
        <ul
          className="row align-items-center"
          data-grid-cols="3"
          data-columns-mobile="1"
        >
          {listaProductos.productos?.map((item) => <Producto producto={item} />)}
        </ul>
      </div>
    </section>
  );
}

export default Tienda;
