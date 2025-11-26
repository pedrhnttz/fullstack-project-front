import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import backIcon from "../../assets/back.png";
import "./EditProduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("https://fullstack-project-appp.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === Number(id));
        if (!found) {
          alert("Produto não encontrado.");
          navigate("/");
          return;
        }

        setProduct(found);
        setName(found.name);
        setPrice(found.price);
        setQuantity(found.quantity);
        setImageUrl(found.image_url);
      });
  }, [id, navigate]);

  if (!product) return null;

  const handleSave = async () => {
    const updatedProduct = {
      name,
      price: Number(price),
      quantity: Number(quantity),
      image_url: imageUrl
    };

    try {
      const res = await fetch(
        `https://fullstack-project-appp.onrender.com/products/${product.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro || "Erro ao atualizar produto.");
        return;
      }

      alert("Produto atualizado com sucesso!");
      navigate(`/product/${product.id}`);
    } catch (err) {
      alert("Erro ao se conectar com o servidor.");
    }
  };

  return (
    <>
      <Header />
      <Sidebar />

      <div className="edit-container">

        <div className="edit-top-actions">
          <img
            src={backIcon}
            alt="Voltar"
            className="edit-icon-btn"
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="edit-content">

          <div className="edit-image-area">
            <img
              src={`https://fullstack-project-appp.onrender.com${imageUrl}`}
              alt={name}
              className="edit-big-img"
            />
          </div>

          <div className="edit-form">
            <h1 className="edit-title">Editar Produto</h1>

            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Preço:</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label>Quantidade em estoque:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <label>URL da imagem:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <button className="save-btn" onClick={handleSave}>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
