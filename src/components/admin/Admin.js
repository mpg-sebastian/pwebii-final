import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom';
import { fetchData } from '../../utils/fetchData';
import { ApiWebURL } from '../../utils';
import ProductoAdmin from '../producto/ProductoAdmin';

function Admin() {
    const [listaProductos, setListaProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState([]);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = async () => {
        const rutaServicio = `${ApiWebURL}/productos.php`;
        const data = await fetchData(rutaServicio);
        setListaProductos(data);
    };

    const seleccionarProducto = (event, item) => {
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
    <section id="tienda" className='padded'>
            <div className="container">
                <h2>Productos</h2>
                <div className="row">
                    <div className="col-md-3">
                    <ul className="list-group" id="lista-categorias">

                    {listaProductos.productos?.map((item) =>
                        <li className="list-group-item" key={item.idcategoria} 
                            onClick = {(event) => seleccionarProducto(event, item)}>
                            <h5>{item.nombre}</h5>
                            <p>{item.descripcion}</p>
                        </li>
                    )}

                    </ul>
                    </div>
                    <div className="col-md-9">
                        <ProductoAdmin producto={productoSeleccionado.id} />
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Admin