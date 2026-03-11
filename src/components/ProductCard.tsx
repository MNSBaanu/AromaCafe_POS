import { Product } from '../App'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card" onClick={() => onAddToCart(product)}>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-category">{product.category}</span>
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
