import { CartItem } from '../App'
import './CartItemCard.css'

interface CartItemCardProps {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const itemTotal = item.price * item.quantity

  return (
    <div className="cart-item-card">
      <div className="cart-item-image-container">
        <img src={item.image} alt={item.name} className="cart-item-image" />
      </div>
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h4 className="cart-item-name">{item.name}</h4>
          <button
            className="remove-item-button"
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="cart-item-price-row">
          <span className="cart-item-unit-price">${item.price.toFixed(2)} each</span>
        </div>
        <div className="cart-item-footer">
          <div className="quantity-controls">
            <button
              className="quantity-button"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button
              className="quantity-button"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <span className="cart-item-total">${itemTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard
