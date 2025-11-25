import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <h2 className="sidebar-title">Menu</h2>

      <nav className="sidebar-nav">

        <button onClick={() => (window.location.href = "/")}>
          Produtos
        </button>

        <button onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => (window.location.href = "/sales")}>
          Vendas
        </button>

      </nav>

    </aside>
  );
}
