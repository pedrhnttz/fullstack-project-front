import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import AddProductCard from "../../components/AddProductCard/AddProductCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fullstack-project-appp.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
      });
  }, []);

  return (
    <>
      <Header />
      <Sidebar />

      <main className="content">
        <h1 className="title">Gerenciador de Produtos</h1>

        <div className="product-grid">

          {/* Card fixo para adicionar produto */}
          <AddProductCard />

          {/* Renderizar cards da API */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>
      </main>
    </>
  );
}
