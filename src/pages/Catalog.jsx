// src/pages/Catalog.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'

export default function Catalog() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Product Catalog</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3>{product.name}</h3>
              <p>{product.shortDesc}</p>
              <p>
                <strong style={{ fontSize: '1.2em', color: '#d9534f' }}>₹{product.price}</strong>
              </p>
            </div>
            <Link to={`/product/${product.id}`} style={{ marginTop: '10px' }}>
              <button style={{ width: '100%', padding: '8px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}