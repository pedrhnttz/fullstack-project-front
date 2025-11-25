import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import backIcon from "../../assets/back.png";
import "./AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");

    if (!email || !token) {
      alert("Você precisa estar logado para adicionar produtos.");
      navigate("/login");
      return;
    }

    fetch(`https://fullstack-project-appp.onrender.com/sellers/${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          alert("Usuário não encontrado.");
          navigate("/login");
          return;
        }
        setSellerId(data.id);
      })
      .catch(() => {
        alert("Erro ao carregar usuário.");
        navigate("/login");
      });
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Escolha uma imagem para o produto.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("seller_id", sellerId);
    formData.append("image", imageFile);

    try {
      const res = await fetch("https://fullstack-project-appp.onrender.com/products", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro || "Erro ao cadastrar produto.");
        return;
      }

      alert("Produto cadastrado com sucesso!");
      navigate("/");

    } catch {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <Header />
      <Sidebar />

      <div className="addprod-container">

        {/* Botão voltar */}
        <div className="addprod-top-actions">
          <img
            src={backIcon}
            alt="Voltar"
            className="addprod-icon-btn"
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="addprod-content">

          {/* Preview da imagem */}
          <div className="addprod-image-area">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="addprod-img" />
            ) : (
              <div className="addprod-empty-img">
                Escolha uma imagem
              </div>
            )}
          </div>

          {/* Form */}
          <form className="addprod-form" onSubmit={handleSubmit}>
            <h1 className="addprod-title">Adicionar Produto</h1>

            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />

            <label>Preço</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />

            <label>Quantidade</label>
            <input
              type="number"
              value={qty}
              onChange={e => setQty(e.target.value)}
              required
            />

            <label>Imagem do Produto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            <button type="submit" className="addprod-btn">
              Cadastrar Produto
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
