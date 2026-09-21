import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import OrderHistory from './pages/OrderHistory.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'

// Route protection (redirecting logged-out users, redirecting non-admins away from
// /admin/*) is not wired up yet — that's Phase 2 in TASKS.md. This is just the shell
// so every page has a URL to live at while we build them out one by one.

function App() {
  return (
    <BrowserRouter basename="/petify/">
      <nav>
        <Link to="/">Home</Link> | <Link to="/catalog">Catalog</Link> |{' '}
        <Link to="/cart">Cart</Link> | <Link to="/login">Log in</Link> |{' '}
        <Link to="/signup">Sign up</Link> | <Link to="/orders">Orders</Link> |{' '}
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
