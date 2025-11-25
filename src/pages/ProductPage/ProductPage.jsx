import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ProductPage.css";

import backIcon from "../../assets/back.png";
import editIcon from "../../assets/edit.png";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`https://fullstack-project-appp.onrender.com/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === Number(id));
        if (!found) {
          alert("Produto não encontrado.");
          navigate("/");
          return;
        }
        setProduct(found);
      })
      .catch(() => {
        alert("Erro ao carregar produto.");
        navigate("/");
      });
  }, [id, navigate]);

  if (!product) return null;

  const handleBuy = async () => {
    if (qty > product.quantity) {
      alert(`Quantidade solicitada maior que o estoque disponível (${product.quantity}).`);
      return;
    }

    const saleRequest = {
      product_id: product.id,
      sold_qty: Number(qty)
    };

    try {
      const res = await fetch("https://fullstack-project-appp.onrender.com/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(saleRequest)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro || "Erro ao efetuar a compra.");
        return;
      }

      alert("Compra realizada com sucesso!");
      navigate("/");
    } catch {
      alert("Erro ao se conectar com o servidor.");
    }
  };

  return (
    <>
      <Header />
      <Sidebar />

      <div className="product-container">

        <div className="top-actions">
          <img
            src={backIcon}
            alt="Voltar"
            className="icon-btn"
            onClick={() => navigate("/")}
          />

          <img
            src={editIcon}
            alt="Editar"
            className="icon-btn"
            onClick={() => navigate(`/edit-product/${product.id}`)}
          />
        </div>

        <div className="product-content">

          <div className="product-image-area">
            <img
              src={`https://fullstack-project-appp.onrender.com${product.image_url}`}
              alt={product.name}
              className="product-big-img"
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            <h2 className="product-price">R$ {product.price.toFixed(2)}</h2>

            <p className="product-stock">Estoque disponível: {product.quantity}</p>

            <label className="qty-label">Quantidade:</label>
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="qty-input"
            />

            <button className="buy-btn" onClick={handleBuy}>
              Comprar
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
