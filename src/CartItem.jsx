import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectCartItems,
  selectTotalCost,
  selectTotalQuantity,
} from './CartSlice.jsx'
import Header from './Header.jsx'

function CartRow({ item }) {
  const dispatch = useDispatch()
  const lineTotal = item.price * item.quantity

  return (
    <li className="cart-item">
      <img className="cart-item-thumbnail" src={item.image} alt={item.name} />
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-unit-price">Unit price: ${item.price.toFixed(2)}</p>
      </div>
      <div className="quantity-controls">
        <button
          type="button"
          className="quantity-button"
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => dispatch(decreaseQuantity(item.id))}
        >
          −
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button
          type="button"
          className="quantity-button"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => dispatch(increaseQuantity(item.id))}
        >
          +
        </button>
      </div>
      <p className="cart-item-total">${lineTotal.toFixed(2)}</p>
      <button
        type="button"
        className="delete-button"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => dispatch(removeItem(item.id))}
      >
        Delete
      </button>
    </li>
  )
}

function CartItem() {
  const cartItems = useSelector(selectCartItems)
  const totalQuantity = useSelector(selectTotalQuantity)
  const totalCost = useSelector(selectTotalCost)
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const handleCheckout = () => {
    setCheckoutMessage('Coming Soon — checkout will be available shortly!')
  }

  if (cartItems.length === 0) {
    return (
      <div className="page-shell">
        <Header />
        <main className="cart-page">
          <h1 className="page-title">Your Shopping Cart</h1>
          <p className="empty-cart-message">Your cart is empty.</p>
          <Link to="/products" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <Header />
      <main className="cart-page">
        <h1 className="page-title">Your Shopping Cart</h1>

        <div className="cart-summary">
          <p className="cart-total-plants">
            Total plants in cart: <strong>{totalQuantity}</strong>
          </p>
          <p className="cart-total-cost">
            Total cost:{' '}
            <strong data-testid="cart-total-cost">${totalCost.toFixed(2)}</strong>
          </p>
        </div>

        <ul className="cart-items-list">
          {cartItems.map((item) => (
            <CartRow key={item.id} item={item} />
          ))}
        </ul>

        <div className="cart-actions">
          <Link to="/products" className="continue-shopping-button">
            Continue Shopping
          </Link>
          <button type="button" className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>

        {checkoutMessage && (
          <p className="checkout-message" role="status">
            {checkoutMessage}
          </p>
        )}
      </main>
    </div>
  )
}

export default CartItem
