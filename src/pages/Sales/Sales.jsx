import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Sales.css";

export default function Sales() {
  const [sales, setSales] = useState([]);

  const deactivateStatus = (saleid) => {
    try {
      const res = fetch(
        `https://fullstack-project-appp.onrender.com/sales/deactivate/${saleid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" }
        }
      );

      const data = res.json();

      if (!res.ok) {
        alert(data.erro || "Erro ao desativar a venda.");
        return;
      }

      alert("Venda desativada com sucesso!");
    } catch (err) {
      alert("Erro ao se conectar com o servidor.");
    }
  }

  useEffect(() => {
    async function loadSales() {
      try {
        const res = await fetch("https://fullstack-project-appp.onrender.com/sales");
        const salesData = await res.json();

        const productRequests = salesData.map((sale) =>
          fetch(`https://fullstack-project-appp.onrender.com/products/${sale.product_id}`)
            .then((res) => res.json())
            .catch(() => ({ name: "Produto não encontrado" }))
        );

        const productsData = await Promise.all(productRequests);

        const combined = salesData.map((sale, index) => ({
          ...sale,
          product_name: productsData[index].name
        }));

        setSales(combined);

      } catch (error) {
        console.error("Erro ao carregar vendas:", error);
      }
    }

    loadSales();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />

      <main className="sales-content">
        <h1 className="sales-title">Todas as Vendas</h1>

        {sales.length === 0 ? (
          <p className="empty-text">Nenhuma venda encontrada.</p>
        ) : (
          <table className="sales-table">
            <thead>
              <tr>
                <th>Nome do Produto</th>
                <th>Quantidade</th>
                <th>Preço na Venda</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.product_name}</td>
                  <td>{sale.sold_qty}</td>
                  <td>R$ {sale.price_at_sale.toFixed(2)}</td>
                  <td><button onClick={() => deactivateStatus(sale.id)}>Desativar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
