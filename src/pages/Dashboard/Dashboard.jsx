import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    async function loadSales() {
      try {
        const res = await fetch("https://fullstack-project-appp.onrender.com/sales");
        const data = await res.json();
        setSales(data);

        // total de vendas
        setTotalSales(data.length);

        // soma das quantidades vendidas
        setTotalQty(data.reduce((sum, sale) => sum + sale.sold_qty, 0));

        // soma dos valores
        setTotalValue(
          data.reduce((sum, sale) => sum + (sale.price_at_sale * sale.sold_qty), 0)
        );

      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      }
    }

    loadSales();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />

      <main className="dash-content">
        <h1 className="dash-title">Dashboard de Vendas</h1>

        {/* Cards de resumo */}
        <div className="dash-cards">

          <div className="dash-card">
            <h3>Total de Vendas</h3>
            <p>{totalSales}</p>
          </div>

          <div className="dash-card">
            <h3>Qtd Vendida</h3>
            <p>{totalQty}</p>
          </div>

          <div className="dash-card">
            <h3>Faturamento</h3>
            <p>R$ {totalValue.toFixed(2)}</p>
          </div>

        </div>

        {/* Últimas vendas */}
        <h2 className="dash-subtitle">Últimas Vendas</h2>

        <table className="dash-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
            </tr>
          </thead>

          <tbody>
            {sales.slice(0, 5).map((sale) => (
              <tr key={sale.id}>
                <td>{sale.product_id}</td>
                <td>{sale.sold_qty}</td>
                <td>R$ {sale.price_at_sale.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </main>
    </>
  );
}
