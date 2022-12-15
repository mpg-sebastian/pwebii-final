import React, { useEffect, useState } from "react";
import { ApiWebURL } from "../../utils";
import { fetchData, postData } from "../../utils/fetchData";
import { Link } from "react-router-dom";
import { BsFillTrashFill, BsPencilSquare, BsViewList } from "react-icons/bs";
import "../../styles/producto.css"

export default function ProductoAdmin({ key, producto }) {
  const [listaProductos, setListaProductos] = useState({});
  const [itemProducto, setItemProducto] = useState({});


  useEffect(() => {
    leerServicio(producto);
  }, [producto]);

  const leerServicio = async (idproducto) => {
    const rutaServicio = ApiWebURL + "producto.php?id=" + idproducto;
    const response = await fetch(rutaServicio);
    const data = await response.json();
    // console.log(data.producto);
    setListaProductos(data.producto);
    setItemProducto(data.producto);
  };

//   const dibujarProducto = (item) => {
//       return (
//           <li className="col list-group-item" key={key}>
//               <div className="card">

//                   <Link to={"/productodetalles/" + item.id}>
//                       <img src={item.imagen} className="card-img-top" alt={item.nombre} width="350" height="281" />
//                   </Link>

//                   <div className="card-body">
//                       <h5 className="card-title">{item.nombre}</h5>
//                       <p className="card-text">{String(item.descripcion).slice(0, 50) + "..."}</p>
//                       <span className="card-text me-2">S/ {item.precio}</span>
//                       <span className="card-text pointer" onClick={() => agregarCarrito(item.id)}><BsFillBasketFill /></span>
//                   </div>
//               </div>
//           </li>
//       )
//   }

  const dibujarTabla = () => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Descripcion</th>
                    <th>Stock</th>
                    <th>Precio S/</th>
                    <th>Estado</th>
                    <th>Imagen</th>
                    <th className="text-end">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <td>{listaProductos.id}</td>
                <td>{listaProductos.nombre}</td>
                <td>{String(listaProductos.descripcion).slice(0, 10)}</td>
                <td>{listaProductos.stock}</td>
                <td>{listaProductos.precio}</td>
                <td >{listaProductos.estado}</td>
                <td>{String(listaProductos.imagen).slice(0, 10)}</td>
                <td className="text-end">
                    <button className="btn btn-success active" data-bs-toggle="modal" data-bs-target="#editProductModal" onClick={() => dibujarVistaRapida()}><BsPencilSquare /></button>
                    <button className="btn btn-danger active ms-1"><BsFillTrashFill /></button>
                </td>
            </tbody>
        </table>
    )
}

    const handleSubmit = (e) => {
        // actualizar producto
        const rutaServicio = ApiWebURL + "actualizar.php";
        const data = {
            id: itemProducto.id,
            nombre: itemProducto.nombre,
            descripcion: itemProducto.descripcion,
            stock: itemProducto.stock,
            precio: itemProducto.precio,
            estado: itemProducto.estado,
            imagen: itemProducto.imagen
        }
        postData(rutaServicio, data);
        
        console.log("Producto Editado Satisfactoriamente");
    }

    const dibujarVistaRapida = () => {
        return (
            <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{itemProducto.nombre}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit()}>
                        <div class="modal-body form-edit-product">
                            
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Nombre:</label>
                                    <input type="text" class="form-control" id="recipient-name" value={itemProducto.nombre} onChange={(e) => (e.target.value)} />

                                    <label for="recipient-name" class="col-form-label">Descripcion:</label>
                                    <input type="text" class="form-control" id="recipient-name" value={itemProducto.descripcion} onChange={(e) => (e.target.value)} />

                                    <label for="recipient-name" class="col-form-label">Stock:</label>
                                    <input type="text" class="form-control" id="recipient-name" value={itemProducto.stock} onChange={(e) => (e.target.value)} />

                                    <label for="recipient-name" class="col-form-label">Precio:</label>
                                    <input type="text" class="form-control" id="recipient-name" value={itemProducto.precio} onChange={(e) => (e.target.value)} />

                                    <label for="recipient-name" class="col-form-label">Estado:</label>
                                    <input type="text" class="form-control" id="recipient-name" value={itemProducto.estado}  onChange={(e) => (e.target.value)} />

                                    <label for="recipient-name" class="col-form-label">Imagen:</label>
                                    <input type="text" class="form-control" id="recipient-name" value={itemProducto.imagen} onChange={(e) => (e.target.value)} />
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" class="btn btn-primary">Editar Producto</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
  

  return (
    <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#cuadricula-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                        <BsViewList />
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="cuadricula-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    {dibujarTabla()}
                </div>
            </div>
            {dibujarVistaRapida()}
        </>
  )
 
}
