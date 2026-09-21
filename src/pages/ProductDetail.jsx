import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products, storeContactInfo } from '../data/products.js'

export default function ProductDetail() {
  const { id } = useParams()
  const [imageError, setImageError] = useState(false)
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div style={{ padding: '40px 20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: '#666', margin: '10px 0 20px 0' }}>
          The requested product ID <code>{id}</code> could not be located in our catalog.
        </p>
        <Link 
          to="/catalog" 
          style={{ 
            display: 'inline-block', 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: '#fff', 
            textDecoration: 'none', 
            borderRadius: '4px' 
          }}
        >
          ← Return to Catalog
        </Link>
      </div>
    )
  }

  const isCombo = product.type === 'combo'
  const imageUrl = product.image ? `${import.meta.env.BASE_URL}${product.image}` : null

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '850px', margin: '0 auto' }}>
      <Link to="/catalog" style={{ textDecoration: 'none', color: '#0056b3', fontWeight: 'bold' }}>
        ← Back to Catalog
      </Link>

      <div style={{ marginTop: '20px', border: '1px solid #e0e0e0', padding: '24px', borderRadius: '12px', backgroundColor: '#fff' }}>
        
        {/* Product Image / Image Placeholder */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          {imageUrl && !imageError ? (
            <img 
              src={imageUrl} 
              alt={product.name} 
              onError={() => setImageError(true)}
              style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #f0f0f0' }} 
            />
          ) : (
            <div 
              style={{ 
                width: '100%', 
                maxWidth: '400px', 
                height: '240px', 
                backgroundColor: '#f8f9fa', 
                border: '2px dashed #ccc', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#6c757d', 
                fontWeight: 'bold',
                fontSize: '1.1em'
              }}
            >
              📷 No Image Available Yet
            </div>
          )}
        </div>

        {/* Product Title & Category */}
        <span style={{ fontSize: '0.85em', color: '#007bff', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>
          {product.category || (isCombo ? 'Special Combo' : 'Fish Nutrition')}
        </span>
        <h1 style={{ margin: '8px 0 16px 0', fontSize: '1.8em' }}>{product.name}</h1>

        {/* Pricing & Savings */}
        <div style={{ margin: '15px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '2em', fontWeight: 'bold', color: '#d9534f' }}>
            ₹{product.price.toFixed(2)}
          </span>
          {isCombo && product.price < product.originalPrice && (
            <>
              <span style={{ fontSize: '1.2em', textDecoration: 'line-through', color: '#888' }}>
                ₹{product.originalPrice.toFixed(2)}
              </span>
              <span style={{ backgroundColor: '#28a745', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9em', fontWeight: 'bold' }}>
                Save ₹{product.savings}
              </span>
            </>
          )}
        </div>

        <p style={{ fontSize: '1.05em', color: '#444', lineHeight: '1.5' }}>{product.shortDesc}</p>

        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />

        {/* Target Species / Ideal For */}
        {product.idealFor && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '8px' }}>Ideal For:</h3>
            <p style={{ margin: 0, color: '#333' }}>{product.idealFor}</p>
          </div>
        )}

        {/* Single Item Specifics: Ingredients, Nutritional Analysis, Feeding Guide */}
        {!isCombo && (
          <>
            {product.ingredients && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '8px' }}>Ingredients:</h3>
                <p style={{ margin: 0, color: '#333' }}>{product.ingredients}</p>
              </div>
            )}

            {product.nutritionalFacts && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '8px' }}>Nutritional Facts (Typical Analysis):</h3>
                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', margin: 0 }}>
                  {Object.entries(product.nutritionalFacts).map(([key, value]) => (
                    <li key={key} style={{ textTransform: 'capitalize', marginBottom: '4px', color: '#333' }}>
                      <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.feedingGuide && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '8px' }}>Feeding Guide:</h3>
                <p style={{ margin: 0, color: '#333' }}>{product.feedingGuide}</p>
              </div>
            )}
          </>
        )}

        {/* Core Product Features */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '8px' }}>Key Features & Benefits:</h3>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li style={{ marginBottom: '6px' }}><strong>Natural Ingredients:</strong> High-quality raw materials with zero harmful additives[cite: 5, 8, 9, 10]</li>
            <li style={{ marginBottom: '6px' }}><strong>High Protein:</strong> Supports healthy growth & vitality[cite: 4, 5, 6, 7, 8, 9, 10, 11]</li>
            <li style={{ marginBottom: '6px' }}><strong>Enhances Color:</strong> Brings out natural vibrant coloration[cite: 4, 5, 6, 7, 8, 9, 10, 11]</li>
            <li style={{ marginBottom: '6px' }}><strong>Easy Digestion:</strong> Formulated for optimal absorption[cite: 4, 5, 6, 7, 8, 9, 10, 11]</li>
            <li style={{ marginBottom: '6px' }}><strong>Immune Support:</strong> Strengthens disease resistance naturally[cite: 4, 5, 6, 7, 10]</li>
          </ul>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => alert(`Added ${product.name} to cart!`)}
          style={{ 
            width: '100%', 
            marginTop: '10px', 
            padding: '14px', 
            fontSize: '1.1em', 
            backgroundColor: '#007bff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontWeight: 'bold' 
          }}
        >
          Add to Cart
        </button>

        {/* Footer Contact Details */}
        <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #eee', fontSize: '0.85em', color: '#666', lineHeight: '1.6' }}>
          <p style={{ margin: '2px 0' }}><strong>Packed & Marketed By:</strong> {storeContactInfo.company}[cite: 4, 5, 6, 7, 8, 9, 10, 11]</p>
          <p style={{ margin: '2px 0' }}><strong>Customer Support:</strong> {storeContactInfo.phone} | {storeContactInfo.email}[cite: 8, 9]</p>
        </div>
      </div>
    </div>
  )
}