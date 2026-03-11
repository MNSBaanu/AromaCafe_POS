import { CartItem } from '../App'
import CartItemCard from './CartItemCard'
import './Cart.css'

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onClearCart: () => void
  onCheckout: () => void
}

function Cart({ items, onUpdateQuantity, onRemoveItem, onClearCart, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="cart">
      <div className="cart-header">
        <h2 className="cart-title">Current Order</h2>
        {items.length > 0 && (
          <button className="clear-cart-button" onClick={onClearCart}>
            Clear All
          </button>
        )}
      </div>

      <div className="cart-items">
        {items.length === 0 ? (
          <div className="empty-cart">
            <svg className="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className="empty-cart-text">No items in cart</p>
            <p className="empty-cart-subtext">Add items to get started</p>
          </div>
        ) : (
          items.map(item => (
            <CartItemCard
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
            />
          ))
        )}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span className="summary-label">Subtotal</span>
          <span className="summary-value">${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Tax (8%)</span>
          <span className="summary-value">${tax.toFixed(2)}</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-row total-row">
          <span className="summary-label">Total</span>
          <span className="summary-value total-value">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button
          className="checkout-button"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
