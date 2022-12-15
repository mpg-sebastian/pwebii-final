import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./common/footer";
import Header from "./common/header";
import Layout from "./common/layout";
import Admin from "./pages/Admin";
import Carrito from "./pages/Carrito";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";

function App() {
  return (
    <div className="">
      <Layout>
        <Header />
        <main>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/tienda" element={<Tienda />} />
            <Route index path="/carrito" element={<Carrito />} />
            <Route index path="/admin" element={<Admin />} />
            <Route path="*" element={<h2>La página no exíste.</h2>} />
          </Routes>
        </main>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
