import { Link } from 'react-router-dom'
import AboutUs from './AboutUs.jsx'
import './App.css'

function App() {
  return (
    <main className="landing-page">
      <div className="landing-card">
        <h1 className="company-name">Paradise Nursery</h1>
        <AboutUs />
        <Link to="/products" className="get-started-button">
          Get Started
        </Link>
      </div>
    </main>
  )
}

export default App
