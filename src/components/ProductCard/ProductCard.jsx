import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={`https://fullstack-project-appp.onrender.com${product.image_url}`}
        alt={product.name}
        className="product-img"
        onClick={() => window.location.href = `/product/${product.id}`}
      />

      <h3>{product.name}</h3>
      <p className="price">R$ {product.price}</p>
      <p className="qty">Estoque: {product.quantity}</p>
    </div>
  );
}
