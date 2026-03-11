import { useState } from 'react'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import './App.css'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const handleCheckout = () => {
    alert('Checkout functionality will be implemented soon!')
    clearCart()
  }

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <ProductGrid
          onAddToCart={addToCart}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  )
}

export default App
