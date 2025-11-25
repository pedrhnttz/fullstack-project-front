import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../../components/Header/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://fullstack-project-appp.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: senha
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.erro || "Erro ao fazer login.");
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userEmail", email);

      alert("Login efetuado com sucesso!");
      navigate("/");

    } catch (err) {
      setError("Falha na conexão com o servidor.");
    }
  };

  return (
    <>
      <Header />

      <div className="login-container">
        <form className="login-box" onSubmit={handleLogin}>
          <h2 className="login-title">Acessar Conta</h2>

          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Entrar</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
}

