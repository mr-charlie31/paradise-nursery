import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AboutUs from './AboutUs.jsx'
import ProductList from './ProductList.jsx'
import './App.css'

function App() {
  // Controls whether the product listing page is shown from the landing page
  const [showProductList, setShowProductList] = useState(false)
  const navigate = useNavigate()

  // Get Started onClick handler: set showProductList to true and
  // navigate to the product listing page
  const handleGetStarted = () => {
    setShowProductList(true)
    navigate('/products')
  }

  // When showProductList is true, display the product listing page
  if (showProductList) {
    return <ProductList />
  }

  return (
    <main className="landing-page">
      <div className="landing-card">
        <h1 className="company-name">Paradise Nursery</h1>
        <AboutUs />
        <button
          type="button"
          className="get-started-button"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </main>
  )
}

export default App
