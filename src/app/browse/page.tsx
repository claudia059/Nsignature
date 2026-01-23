'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { propertiesDatabase, Property } from '@/data/properties'
import SearchFilters from '@/components/SearchFilters'
import PropertyCard from '@/components/PropertyCard'

export default function Browse() {
  const [filters, setFilters] = useState({
    searchQuery: '',
    minPrice: 0,
    maxPrice: 10000000,
    beds: null as number | null,
    baths: null as number | null,
    propertyType: null as string | null,
    city: null as string | null,
  })

  const [sortBy, setSortBy] = useState('recent')
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')

  const filteredProperties = useMemo(() => {
    let results = propertiesDatabase.filter(property => {
      const matchesSearch = 
        property.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        property.neighborhood.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(filters.searchQuery.toLowerCase())
      
      const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice
      const matchesBeds = filters.beds === null || property.beds === filters.beds
      const matchesBaths = filters.baths === null || property.baths === filters.baths
      const matchesType = filters.propertyType === null || property.propertyType === filters.propertyType
      const matchesCity = filters.city === null || property.city === filters.city

      return matchesSearch && matchesPrice && matchesBeds && matchesBaths && matchesType && matchesCity
    })

    // Sort results
    if (sortBy === 'price-low') {
      results.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'recent') {
      results.sort((a, b) => a.daysSinceActive - b.daysSinceActive)
    }

    return results
  }, [filters, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Breadcrumb */}
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link href="/" className="text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item active">Browse Properties</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <div>
              <h2 className="fw-bold mb-1">Browse All Properties</h2>
              <small className="text-muted">Find your ideal property from our extensive collection</small>
            </div>
            <div className="d-flex gap-2">
              <button 
                className={`btn btn-sm rounded-pill ${viewType === 'grid' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setViewType('grid')}
              >
                ⊞ Grid
              </button>
              <button 
                className={`btn btn-sm rounded-pill ${viewType === 'list' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setViewType('list')}
              >
                ☰ List
              </button>
            </div>
          </div>

          {/* Filters */}
          <SearchFilters filters={filters} setFilters={setFilters} />
        </div>
      </section>

      {/* Sidebar and Results */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Sidebar Filters */}
            <div className="col-lg-3">
              <div className="bg-white rounded-3 shadow-sm p-4 sticky-top" style={{ top: '100px' }}>
                <h6 className="fw-bold mb-4 text-dark">Refine Search</h6>

                {/* Price Range */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-dark">Price Range</label>
                  <div className="d-flex gap-2 mb-3">
                    <input 
                      type="number" 
                      className="form-control form-control-sm" 
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value)})}
                    />
                    <input 
                      type="number" 
                      className="form-control form-control-sm" 
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                    />
                  </div>
                  <div className="text-muted small">
                    {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
                  </div>
                </div>

                <hr />

                {/* Bedrooms */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-dark">Bedrooms</label>
                  <div className="d-flex flex-wrap gap-2">
                    {[0, 1, 2, 3, 4].map(bed => (
                      <button 
                        key={bed}
                        className={`btn btn-sm rounded-pill ${filters.beds === bed ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setFilters({...filters, beds: filters.beds === bed ? null : bed})}
                      >
                        {bed === 0 ? 'Studio' : `${bed} Bed`}
                      </button>
                    ))}
                  </div>
                </div>

                <hr />

                {/* Property Type */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-dark">Property Type</label>
                  <div className="d-flex flex-column gap-2">
                    {['apartment', 'house', 'condo', 'townhouse', 'studio'].map(type => (
                      <label key={type} className="form-check">
                        <input 
                          type="checkbox" 
                          className="form-check-input"
                          checked={filters.propertyType === type}
                          onChange={() => setFilters({...filters, propertyType: filters.propertyType === type ? null : type as any})}
                        />
                        <span className="form-check-label text-capitalize text-muted small">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr />

                {/* Cities */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-dark">City</label>
                  <select 
                    className="form-select form-select-sm"
                    value={filters.city || ''}
                    onChange={(e) => setFilters({...filters, city: e.target.value || null})}
                  >
                    <option value="">All Cities</option>
                    {Array.from(new Set(propertiesDatabase.map(p => p.city))).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <button 
                  className="btn btn-outline-secondary w-100 btn-sm rounded-2"
                  onClick={() => setFilters({ searchQuery: '', minPrice: 0, maxPrice: 10000000, beds: null, baths: null, propertyType: null, city: null })}
                >
                  Reset All Filters
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              {/* Results Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded-3 shadow-sm flex-wrap gap-3">
                <div>
                  <h6 className="mb-0 fw-bold text-dark">
                    {filteredProperties.length} Result{filteredProperties.length !== 1 ? 's' : ''} Found
                  </h6>
                  <small className="text-muted">Showing properties matching your criteria</small>
                </div>
                <select 
                  className="form-select form-select-sm" 
                  style={{ maxWidth: '150px' }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Properties Grid/List */}
              {filteredProperties.length > 0 ? (
                <>
                  {viewType === 'grid' ? (
                    <div className="row g-4">
                      {filteredProperties.map(property => (
                        <div key={property.id} className="col-lg-6 col-xl-4">
                          <PropertyCard property={property} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredProperties.map(property => (
                        <Link key={property.id} href={`/property/${property.id}`} className="text-decoration-none">
                          <div className="bg-white rounded-3 shadow-sm p-4 mb-3 d-flex gap-4 h-100 overflow-hidden transition-all" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
                            <img 
                              src={property.imageUrl} 
                              alt={property.title}
                              style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                            />
                            <div className="flex-grow-1 d-flex flex-column justify-content-between">
                              <div>
                                <div className="d-flex gap-2 mb-2">
                                  <h5 className="fw-bold text-dark mb-1">{formatPrice(property.price)}</h5>
                                  <span className="badge bg-success">Active</span>
                                </div>
                                <p className="text-dark fw-bold mb-1">{property.title}</p>
                                <small className="text-muted">{property.address}</small><br/>
                                <small className="text-muted">{property.neighborhood} • {property.city}, {property.state}</small>
                              </div>
                              <div className="d-flex gap-4">
                                <div>
                                  <strong className="text-primary">{property.beds === 0 ? 'Studio' : property.beds}</strong>
                                  <small className="text-muted d-block">Beds</small>
                                </div>
                                <div>
                                  <strong className="text-primary">{property.baths}</strong>
                                  <small className="text-muted d-block">Baths</small>
                                </div>
                                <div>
                                  <strong className="text-primary">{(property.sqft / 1000).toFixed(1)}K</strong>
                                  <small className="text-muted d-block">Sqft</small>
                                </div>
                                <div>
                                  <strong className="text-primary text-capitalize">{property.propertyType}</strong>
                                  <small className="text-muted d-block">Type</small>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center">
                              <button className="btn btn-primary rounded-pill fw-bold">View →</button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-3 shadow-sm p-5 text-center">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                  <h4 className="text-dark mb-2">No properties found</h4>
                  <p className="text-muted mb-4">Try adjusting your filters to find properties that match your criteria.</p>
                  <button 
                    type="button" 
                    className="btn btn-primary rounded-pill fw-bold"
                    onClick={() => setFilters({ searchQuery: '', minPrice: 0, maxPrice: 10000000, beds: null, baths: null, propertyType: null, city: null })}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
