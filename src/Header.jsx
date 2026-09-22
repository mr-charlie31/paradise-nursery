import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalQuantity } from './CartSlice.jsx'

function CartIcon() {
  return (
    <svg
      className="cart-icon"
      viewBox="0 0 24 24"
      width="26"
      height="26"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <path d="M3 3h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h7.8a1.5 1.5 0 0 0 1.5-1.2L20 7H6" />
    </svg>
  )
}

function Header() {
  const totalQuantity = useSelector(selectTotalQuantity)

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          Paradise Nursery
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products">Plants</NavLink>
          <NavLink to="/cart" className="cart-link">
            <CartIcon />
            <span>Cart</span>
            <span className="cart-badge" data-testid="cart-count">
              {totalQuantity}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
