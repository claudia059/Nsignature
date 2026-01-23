'use client'

import { useState } from "react"

interface SearchFiltersProps {
  filters: any
  setFilters: any
}

export default function SearchFilters({ filters, setFilters }: SearchFiltersProps) {
  
  const [searchQuery, setSearchQuery] = useState('')
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    setFilters({
      ...filters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: Number(value),
    })
  }

  const cities = [
  "Albany",
  "Amsterdam",
  "Auburn",
  "Batavia",
  "Beacon",
  "Binghamton",
  "Buffalo",
  "Canandaigua",
  "Cohoes",
  "Corning",
  "Cortland",
  "Dunkirk",
  "Elmira",
  "Fulton",
  "Geneva",
  "Glen Cove",
  "Gloversville",
  "Hornell",
  "Hudson",
  "Ithaca",
  "Jamestown",
  "Johnstown",
  "Kingston",
  "Lackawanna",
  "Little Falls",
  "Lockport",
  "Long Beach",
  "Mechanicville",
  "Middletown",
  "Mount Vernon",
  "New Rochelle",
  "New York",
  "Newburgh",
  "Niagara Falls",
  "North Tonawanda",
  "Norwich",
  "Ogdensburg",
  "Olean",
  "Oneida",
  "Oneonta",
  "Oswego",
  "Peekskill",
  "Plattsburgh",
  "Port Jervis",
  "Poughkeepsie",
  "Rensselaer",
  "Rochester",
  "Rome",
  "Rye",
  "Salamanca",
  "Saratoga Springs",
  "Schenectady",
  "Sherrill",
  "Syracuse",
  "Tonawanda",
  "Troy",
  "Utica",
  "Watertown",
  "Watervliet",
  "White Plains",
  "Yonkers"
]

  const bedrooms = [0, 1, 2, 3, 4]
  const bathrooms = [1, 1.5, 2, 2.5, 3]
  const types = ['apartment', 'house', 'condo', 'townhouse', 'studio']

  return (
    <div className="row g-3 Search-property">
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by address or neighborhood..."
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters({ ...filters, searchQuery: e.target.value })
          }
        />
      </div>

      <div className="col-md-2">
        <select
          className="form-select"
          value={filters.city || ''}
          onChange={(e) =>
            setFilters({ ...filters, city: e.target.value || null })
          }
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <select
          className="form-select"
          value={filters.beds || ''}
          onChange={(e) =>
            setFilters({ ...filters, beds: e.target.value ? Number(e.target.value) : null })
          }
        >
          <option value="">All Beds</option>
          {bedrooms.map(bed => (
            <option key={bed} value={bed}>
              {bed === 0 ? 'Studio' : `${bed} Bed${bed > 1 ? 's' : ''}`}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <select
          className="form-select"
          value={filters.baths || ''}
          onChange={(e) =>
            setFilters({ ...filters, baths: e.target.value ? Number(e.target.value) : null })
          }
        >
          <option value="">All Baths</option>
          {bathrooms.map(bath => (
            <option key={bath} value={bath}>{bath} Bath</option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <select
          className="form-select"
          value={filters.propertyType || ''}
          onChange={(e) =>
            setFilters({ ...filters, propertyType: e.target.value || null })
          }
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12">
        <div className="row g-2 small">
          <div className="col-auto">
            <label className="text-muted">Price Range (USD)</label>
          </div>
          <div className="col-auto">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Min"
              style={{ width: '100px' }}
              value={filters.minPrice}
              onChange={(e) => handlePriceChange('min', e.target.value)}
            />
          </div>
          <div className="col-auto">
            <span className="align-middle">-</span>
          </div>
          <div className="col-auto">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Max"
              style={{ width: '100px' }}
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange('max', e.target.value)}
            />
          </div>

          <div className="col-md-1">
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                setFilters({
                  searchQuery: '',
                  minPrice: 0,
                  maxPrice: 10000000,
                  beds: null,
                  baths: null,
                  propertyType: null,
                  city: null,
                })
              }
            >
              Clear
            </button>
          </div>

        </div>
      </div>



    </div>
  )
}
