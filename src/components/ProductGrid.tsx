import { useState } from 'react'
import { Product } from '../App'
import ProductCard from './ProductCard'
import CategoryFilter from './CategoryFilter'
import './ProductGrid.css'

interface ProductGridProps {
  onAddToCart: (product: Product) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const mockProducts: Product[] = [
  { id: '1', name: 'Espresso', price: 3.50, category: 'Coffee', image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg' },
  { id: '2', name: 'Cappuccino', price: 4.50, category: 'Coffee', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg' },
  { id: '3', name: 'Latte', price: 4.75, category: 'Coffee', image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg' },
  { id: '4', name: 'Americano', price: 3.75, category: 'Coffee', image: 'https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg' },
  { id: '5', name: 'Mocha', price: 5.25, category: 'Coffee', image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg' },
  { id: '6', name: 'Croissant', price: 3.25, category: 'Pastries', image: 'https://images.pexels.com/photos/2135677/pexels-photo-2135677.jpeg' },
  { id: '7', name: 'Blueberry Muffin', price: 3.75, category: 'Pastries', image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg' },
  { id: '8', name: 'Chocolate Cake', price: 5.50, category: 'Desserts', image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg' },
  { id: '9', name: 'Cheesecake', price: 6.00, category: 'Desserts', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg' },
  { id: '10', name: 'Green Tea', price: 2.75, category: 'Tea', image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg' },
  { id: '11', name: 'Chai Latte', price: 4.25, category: 'Tea', image: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg' },
  { id: '12', name: 'Iced Coffee', price: 4.00, category: 'Cold Drinks', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg' },
  { id: '13', name: 'Smoothie', price: 5.75, category: 'Cold Drinks', image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg' },
  { id: '14', name: 'Bagel', price: 2.50, category: 'Pastries', image: 'https://images.pexels.com/photos/5947487/pexels-photo-5947487.jpeg' },
  { id: '15', name: 'Sandwich', price: 7.50, category: 'Food', image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg' },
  { id: '16', name: 'Salad', price: 8.25, category: 'Food', image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg' },
]

function ProductGrid({ onAddToCart, selectedCategory, onCategoryChange }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))]

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onCategoryChange}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
