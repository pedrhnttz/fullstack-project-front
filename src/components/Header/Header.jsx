import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUser(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <header className="header">
      <div className="logo">Stock Management</div>

      <nav className="nav">
        {!user ? (
          <>
            <button className="btn" onClick={() => window.location.href = "/cadastro"}>
              Cadastro
            </button>

            <button className="btn-primary" onClick={() => window.location.href = "/login"}>
              Login
            </button>
          </>
        ) : (
          <button className="btn-primary" onClick={handleLogout}>
            {user}
          </button>
        )}
      </nav>
    </header>
  );
}
