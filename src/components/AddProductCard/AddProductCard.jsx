import "./AddProductCard.css";

export default function AddProductCard() {
  const handleClick = () => {
    window.location.href = "/add-product";
  };

  return (
    <div className="add-card" onClick={handleClick}>
      <div className="plus">+</div>
      <p className="add-text">Adicionar Novo Produto</p>
    </div>
  );
}
