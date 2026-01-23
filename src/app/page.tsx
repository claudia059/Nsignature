'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { propertiesDatabase, Property } from '@/data/properties'
import SearchFilters from '@/components/SearchFilters'
import PropertyCard from '@/components/PropertyCard'

export default function Home() {
  const [filters, setFilters] = useState({
    searchQuery: '',
    minPrice: 0,
    maxPrice: 10000000,
    beds: null,
    baths: null,
    propertyType: null,
    city: null,
  })

  const filteredProperties = useMemo(() => {
    return propertiesDatabase.filter(property => {
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
  }, [filters])

  return (
    <div className="bg-light min-vh-100">
      {/* Enhanced Hero Section */}
      <section className="text-white py-5 hero-bg" style={{  minHeight: '280px', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-3 findh">🏡 Find Your Perfect Home</h1>
              <p className="lead text-white mb-4">Discover thousands of properties across New York City. Buy, rent, or invest with confidence.</p>
              <div className="d-flex gap-3  gapHero">
                <span className="badge bg-white text-primary p-2" style={{ fontSize: '0.9rem' }}>✓ 1{propertiesDatabase.length}+ Properties</span>
                <span className="badge bg-white text-primary p-2" style={{ fontSize: '0.9rem' }}>✓ Expert Agents</span>
                <span className="badge bg-white text-primary p-2" style={{ fontSize: '0.9rem' }}>✓ Easy Process</span>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="display-1 mb-0" style={{ opacity: 0.3 }}>🏠</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary bg-opacity-10 py-3 border-bottom">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
            <div>
              <h6 className="mb-1 fw-bold text-dark">🎯 Limited Time Offer</h6>
              <small className="text-muted">Get exclusive access to premium listings</small>
            </div>
            <Link href="/browse" className="btn btn-primary btn-sm rounded-pill fw-bold">View Featured Properties</Link>
          </div>
        </div>
      </section>

      {/* Search and Filters - Sticky */}
      <section className="py-3 bg-white sticky-top border-bottom Search-filter" style={{ zIndex: 50 }}>
        <div className="container">
          <SearchFilters filters={filters} setFilters={setFilters} />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-4" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
        <div className="container">
          <div className="row g-3 mb-5">
            <div className="col-md-3">
              <div className="bg-white rounded-3 shadow-sm p-4 text-center border-top border-primary border-5">
                <div className="h3 fw-bold text-primary mb-1">{propertiesDatabase.length}</div>
                <small className="text-muted">Active Listings</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded-3 shadow-sm p-4 text-center border-top border-success border-5">
                <div className="h3 fw-bold text-success mb-1">${(propertiesDatabase.reduce((sum, p) => sum + p.price, 0) / propertiesDatabase.length / 1000000).toFixed(1)}M</div>
                <small className="text-muted">Avg Price</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded-3 shadow-sm p-4 text-center border-top border-warning border-5">
                <div className="h3 fw-bold text-warning mb-1">{Math.min(...propertiesDatabase.map(p => p.daysSinceActive))}</div>
                <small className="text-muted">Days on Market (Fastest)</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded-3 shadow-sm p-4 text-center border-top border-info border-5">
                <div className="h3 fw-bold text-info mb-1">5⭐</div>
                <small className="text-muted">Customer Rating</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="mb-2 fw-bold">Featured Properties</h2>
              <small className="text-muted">Showing {filteredProperties.length} result{filteredProperties.length !== 1 ? 's' : ''}</small>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-sm btn-outline-secondary active mostbtn">
                ↕ Most Recent
              </button>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="row g-4">
              {filteredProperties.map(property => (
                <div key={property.id} className="col-lg-6 col-xl-4">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3 shadow-sm p-5 text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h4 className="text-dark mb-2">No properties found</h4>
              <p className="text-muted mb-4">Try adjusting your search filters or browse our featured listings.</p>
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
      </section>

      {/* Call to Action Section */}
      <section className="py-5 bg-dark text-white" style={{ marginTop: '3rem' }}>
        <div className="container text-center">
          <h3 className="fw-bold mb-3">Ready to Find Your Dream Home?</h3>
          <p className="lead text-white-50 mb-4">Join thousands of satisfied customers. Get expert guidance from our team.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="/contact" className="btn btn-primary btn-lg rounded-pill fw-bold">Get Started</Link>
            <button type="button" className="btn btn-outline-light btn-lg rounded-pill fw-bold">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  )
}
