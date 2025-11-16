import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [sellerId, setSellerId] = useState(null);

  // verificar login e buscar seller_id
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

  // envio do formulário
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
    formData.append("image", imageFile); // AQUI envia o arquivo

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

    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="addproduct-container">
      <form className="addproduct-box" onSubmit={handleSubmit}>
        <h2>Adicionar Produto</h2>

        <label>Nome</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />

        <label>Preço</label>
        <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />

        <label>Quantidade</label>
        <input type="number" value={qty} onChange={e => setQty(e.target.value)} required />

        <label>Imagem do Produto</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />

        <button type="submit" className="add-btn">Cadastrar</button>
        <a className="back-link" href="/">Voltar</a>
      </form>
    </div>
  );
}
