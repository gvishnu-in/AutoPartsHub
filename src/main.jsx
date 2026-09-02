import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/theme.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import WishlistContextProvider from './context/WishlistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishlistContextProvider>
          <App />
        </WishlistContextProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)