'use client'

import Link from 'next/link'
import { Property } from '@/data/properties'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const pricePerSqft = Math.round(property.price / property.sqft)

  return (
    <Link href={`/property/${property.id}`} className="text-decoration-none">
      <div className="card h-100 shadow-sm border-0 property-card overflow-hidden transition-all" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
        {/* Image Container */}
        <div className="position-relative" style={{ height: '240px', overflow: 'hidden', background: '#f0f0f0' }}>
          <img
            src={property.imageUrl}
            alt={property.title}
            className="card-img-top w-100 h-100"
            style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          {/* Badges */}
          <div className="position-absolute top-0 end-0 m-3 d-flex gap-2 flex-wrap justify-content-end">
            <span className="badge bg-danger" style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}>New</span>
            <span className="badge bg-success" style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}>Active</span>
          </div>
          {/* Price Overlay */}
          <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-50 text-white" style={{ borderTop: '4px solid #0d6efd' }}>
            <div className="h5 mb-0 fw-bold">{formatPrice(property.price)}</div>
          </div>
        </div>

        <div className="card-body d-flex flex-column" style={{ flex: 1 }}>
          {/* Title and Location */}
          <div className="mb-3">
            <h6 className="card-title fw-bold text-dark mb-2 text-truncate" style={{ fontSize: '1rem' }}>{property.title}</h6>
            <div className="d-flex align-items-center gap-2 text-muted small mb-1">
              <span>📍</span>
              <span className="text-truncate">{property.address}</span>
            </div>
            <small className="text-secondary">{property.neighborhood} • {property.city}, {property.state}</small>
          </div>

          {/* Key Stats */}
          <div className="d-flex gap-2 my-3 pb-3 border-bottom" style={{ justifyContent: 'space-around' }}>
            <div className="text-center flex-grow-1">
              <div className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>{property.beds === 0 ? '🏠' : property.beds}</div>
              <small className="text-muted">Beds</small>
            </div>
            <div className="text-center flex-grow-1">
              <div className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>{property.baths}</div>
              <small className="text-muted">Baths</small>
            </div>
            <div className="text-center flex-grow-1">
              <div className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>{(property.sqft / 1000).toFixed(1)}K</div>
              <small className="text-muted">Sqft</small>
            </div>
          </div>

          {/* Additional Info */}
          <div className="small text-muted mb-auto pb-3 border-bottom">
            <div className="mb-2 d-flex justify-content-between">
              <span>💰 Price/Sqft:</span>
              <strong className="text-primary">${pricePerSqft.toLocaleString()}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>🏢 Type:</span>
              <strong className="text-dark text-capitalize">{property.propertyType}</strong>
            </div>
          </div>

          {/* CTA Button */}
          <button className="btn btn-primary w-100 fw-bold rounded-2" style={{ marginTop: 'auto', padding: '0.7rem' }}>
            View Details →
          </button>
        </div>
      </div>
    </Link>
  )
}
