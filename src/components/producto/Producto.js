import React, { useEffect, useState } from "react";
import { ApiWebURL, ApiWebImagesURL } from "../../utils";
import { fetchData } from "../../utils/fetchData";
import { Link } from "react-router-dom";
import { BsFillBasketFill, BsFillPencilFill, BsTable, BsTrashFill, BsViewList } from "react-icons/bs";
import "../../styles/producto.css"

export default function Producto(props) {
  const [listaProductos, setListaProductos] = useState([]);
  const [itemProducto, setItemProducto] = useState([]);
    //console.log(props)


  const agregarCarrito = (item) => {
    item.cantidad = 1;
    console.log(item);
    let carrito = [];
    if (sessionStorage.getItem("carrito")) {
        carrito = JSON.parse(sessionStorage.getItem("carrito"));
        let index = -1;
        for (let i = 0; i < carrito.length; i++) {
            let itemCarrito = carrito[i];
            if (itemCarrito.idproducto === item.idproducto) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            carrito.push(item);//Así se agrega un elemento a un arreglo
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
        }
        else {
            let iCarrito = carrito[index]
            iCarrito.cantidad++
            carrito[index] = iCarrito;
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
        }
    }
    else {
        carrito.push(item);//Así se agrega un elemento a un arreglo
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

  return (
    <>
    </>
  )
 
}
