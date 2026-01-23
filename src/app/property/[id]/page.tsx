'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CompanyInfo, propertiesDatabase } from '@/data/properties'

export default function PropertyDetail() {
  const params = useParams()
  const id = Number(params.id)
  const property = propertiesDatabase.find(p => p.id === id)
  const company = CompanyInfo[0]
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (!property) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Property not found</div>
        <Link href="/" className="btn btn-primary">Back to Listings</Link>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const pricePerSqft = Math.round(property.price / property.sqft)

  return (
    <div className="bg-light min-vh-100">
      {/* Breadcrumb */}
      <div className="bg-white border-bottom py-3 sticky-top" style={{ top: '56px', zIndex: 99 }}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link href="/" className="text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/" className="text-decoration-none">{property.city}</Link></li>
              <li className="breadcrumb-item active">{property.neighborhood}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          {/* Header with Title and Price */}
          <div className="mb-4">
            <h1 className="h2 fw-bold mb-2">{property.title}</h1>
            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-success">Active</span>
              <small className="text-muted">Listed {property.daysSinceActive} days ago</small>
              <small className="text-muted">•</small>
              <small className="text-muted">{property.address}</small>
            </div>
          </div>

          <div className="row g-4">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* Image Gallery */}
              <div className="bg-white rounded-3 shadow-sm overflow-hidden mb-4">
                {/* Main Image */}
                <div style={{ position: 'relative', paddingBottom: '75%', height: 0 }}>
                  <img
                    src={property.imageUrls[activeImageIndex] || property.imageUrl}
                    alt={`${property.title} - View ${activeImageIndex + 1}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* Image Badge */}
                  <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                    <span className="badge bg-danger fs-6">Featured</span>
                  </div>
                  {/* Image Counter */}
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                    <span className="badge bg-dark fs-6">{activeImageIndex + 1} / {property.imageUrls.length}</span>
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {property.imageUrls && property.imageUrls.length > 1 && (
                  <div className="p-3 bg-light d-flex gap-2 overflow-x-auto" style={{ maxHeight: '120px' }}>
                    {property.imageUrls.map((imageUrl, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 border-2 rounded-2 overflow-hidden ${
                          activeImageIndex === index ? 'border-primary' : 'border-light'
                        }`}
                        style={{
                          width: '100px',
                          height: '100px',
                          padding: 0,
                          background: 'none',
                          cursor: 'pointer',
                          opacity: activeImageIndex === index ? 1 : 0.6,
                        }}
                      >
                        <img
                          src={imageUrl}
                          alt={`Thumbnail ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div className="bg-white rounded-3 shadow-sm p-4 text-center">
                    <div className="h4 fw-bold text-primary mb-2">
                      {property.beds === 0 ? 'Studio' : property.beds}
                    </div>
                    <small className="text-muted">Bedrooms</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-white rounded-3 shadow-sm p-4 text-center">
                    <div className="h4 fw-bold text-primary mb-2">{property.baths}</div>
                    <small className="text-muted">Bathrooms</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-white rounded-3 shadow-sm p-4 text-center">
                    <div className="h4 fw-bold text-primary mb-2">{(property.sqft / 1000).toFixed(1)}K</div>
                    <small className="text-muted">Square Feet</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-white rounded-3 shadow-sm p-4 text-center">
                    <div className="h4 fw-bold text-primary mb-2">${pricePerSqft}</div>
                    <small className="text-muted">Price/Sqft</small>
                  </div>
                </div>
              </div>

              {/* Details Tabs */}
              <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
                <ul className="nav nav-tabs border-bottom mb-4" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active fw-500 border-0 border-bottom-3 text-dark"
                      style={{ borderBottomColor: '#0d6efd' }}
                      id="overview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#overview"
                      type="button"
                      role="tab"
                    >
                      📋 Overview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link fw-500 border-0 border-bottom-3 text-dark"
                      id="features-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#features"
                      type="button"
                      role="tab"
                    >
                      ✨ Features
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link fw-500 border-0 border-bottom-3 text-dark"
                      id="transit-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#transit"
                      type="button"
                      role="tab"
                    >
                      🚇 Transit
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link fw-500 border-0 border-bottom-3 text-dark"
                      id="schools-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#schools"
                      type="button"
                      role="tab"
                    >
                      🎓 Schools
                    </button>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane fade show active" id="overview" role="tabpanel">
                    <h5 className="fw-bold mb-3">Property Overview</h5>
                    <p className="text-muted mb-4">{property.description}</p>
                    
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="p-3 bg-light rounded-2">
                          <small className="text-muted d-block mb-1">Address</small>
                          <strong className="text-dark">{property.address}</strong>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 bg-light rounded-2">
                          <small className="text-muted d-block mb-1">Neighborhood</small>
                          <strong className="text-dark">{property.neighborhood}</strong>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 bg-light rounded-2">
                          <small className="text-muted d-block mb-1">Location</small>
                          <strong className="text-dark">{property.city}, {property.state} {property.zipCode}</strong>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 bg-light rounded-2">
                          <small className="text-muted d-block mb-1">Property Type</small>
                          <strong className="text-dark">{property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}</strong>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 bg-light rounded-2">
                          <small className="text-muted d-block mb-1">Year Built</small>
                          <strong className="text-dark">{property.year}</strong>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 bg-light rounded-2">
                          <small className="text-muted d-block mb-1">Days on Market</small>
                          <strong className="text-dark">{property.daysSinceActive} days</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="features" role="tabpanel">
                    <h5 className="fw-bold mb-4">Property Features & Amenities</h5>
                    <div className="row g-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-light rounded-2 h-100">
                            <span className="badge bg-success me-3 fs-6">✓</span>
                            <span className="fw-500">{feature}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="tab-pane fade" id="transit" role="tabpanel">
                    <h5 className="fw-bold mb-4">Public Transportation</h5>
                    <div className="row g-3">
                      {property.transit.map((transit, index) => (
                        <div key={index} className="col-md-6">
                          <div className="p-3 bg-light rounded-2">
                            <span className="fw-500 text-dark">{transit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="tab-pane fade" id="schools" role="tabpanel">
                    <h5 className="fw-bold mb-4">Nearby Schools</h5>
                    <div className="row g-3">
                      {property.schools.map((school, index) => (
                        <div key={index} className="col-md-6">
                          <div className="p-3 bg-light rounded-2">
                            <span className="fw-500 text-dark">📚 {school}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Price Card */}
              <div className="bg-white rounded-3 shadow-sm p-4 mb-4 sticky-top" style={{ top: '120px' }}>
                <div className="text-center mb-4 pb-4 border-bottom">
                  <div className="h2 fw-bold text-primary mb-2">{formatPrice(property.price)}</div>
                  <div className="text-muted">Asking Price</div>
                </div>

                {/* CTA Buttons */}
                <div className="d-grid gap-2 mb-4">
                  <a 
                    className='btn btn-primary btn-lg rounded-2 fw-bold' 
                    href={company.whatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 Contact Agent
                  </a>
                  <a 
                    className='btn btn-outline-primary rounded-2 d-none fw-bold' 
                    href={`mailto:${company.comanyEmail}`}
                  >
                    ✉️ Send Email
                  </a>
                </div>

                {/* Property Info Box */}
                <div className="bg-light p-4 rounded-2 mb-4">
                  <h6 className="fw-bold mb-3">Property Details</h6>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block mb-1">Bedrooms</small>
                    <strong className="text-dark">{property.beds === 0 ? 'Studio' : property.beds} Bed{property.beds !== 1 ? 's' : ''}</strong>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block mb-1">Bathrooms</small>
                    <strong className="text-dark">{property.baths} Bath{property.baths !== 1 ? 's' : ''}</strong>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block mb-1">Square Feet</small>
                    <strong className="text-dark">{property.sqft.toLocaleString()} sqft</strong>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block mb-1">Price per sqft</small>
                    <strong className="text-dark">${pricePerSqft.toLocaleString()}</strong>
                  </div>
                  <div>
                    <small className="text-muted d-block mb-1">Property Type</small>
                    <strong className="text-dark text-capitalize">{property.propertyType}</strong>
                  </div>
                </div>

                {/* Agent Info Card */}
                <div className="bg-primary bg-opacity-10 p-4 rounded-2 border border-primary border-opacity-25">
                  <h6 className="fw-bold mb-3">Listing Company</h6>
                  <div className="mb-3">
                    <strong className="d-block text-dark mb-2">{company.companyName}</strong>
                    <small className="text-muted">{company.decs}</small>
                  </div>
                  <div className="border-top pt-3">
                    <small className="text-muted d-block mb-2">📧 {company.comanyEmail}</small>
                    <small className="text-muted">💬 WhatsApp Available</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
