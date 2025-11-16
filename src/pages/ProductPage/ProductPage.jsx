import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams(); // product_id vindo da URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // Buscar produto pelo ID
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
    // Impedir compra maior que estoque
    if (qty > product.quantidade) {
      alert(`Quantidade solicitada maior que o estoque disponível (${product.quantidade}).`);
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

    } catch (err) {
      alert("Erro ao se conectar com o servidor.");
    }
  };

  return (
    <div className="product-page-container">
      <div className="product-page-card">

        <img src={`https://fullstack-project-appp.onrender.com${product.image_url}`} alt={product.name} className="product-page-img" />

        <h2>{product.name}</h2>

        <p className="product-price">Preço: R$ {product.price}</p>
        <p className="product-stock">Estoque disponível: {product.quantity}</p>

        <label>Quantidade para comprar:</label>
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

        <button className="back-btn" onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>
    </div>
  );
}
