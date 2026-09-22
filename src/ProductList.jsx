import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartItems } from './CartSlice.jsx'
import Header from './Header.jsx'
import { plantCategories } from './data/plants.js'

function ProductCard({ plant }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const isInCart = cartItems.some((item) => item.id === plant.id)

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addItem(plant))
    }
  }

  return (
    <article className="product-card">
      <img className="product-thumbnail" src={plant.image} alt={plant.name} />
      <div className="product-details">
        <h3 className="product-name">{plant.name}</h3>
        <p className="product-price">${plant.price.toFixed(2)}</p>
        <button
          type="button"
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}

function ProductList() {
  return (
    <div className="page-shell">
      <Header />
      <main className="product-list-page">
        <h1 className="page-title">Our Houseplants</h1>
        {plantCategories.map((category) => (
          <section key={category.name} className="plant-category">
            <h2 className="category-title">{category.name}</h2>
            <div className="product-grid">
              {category.plants.map((plant) => (
                <ProductCard key={plant.id} plant={plant} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

export default ProductList
